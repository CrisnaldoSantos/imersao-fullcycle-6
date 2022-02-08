import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetDocument, Tweet } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private readonly tweeetModel: Model<TweetDocument>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return this.tweeetModel.create(createTweetDto);
  }

  findAll(
    { offset, limit }: { offset: number; limit: number } = {
      offset: 0,
      limit: 50,
    },
  ) {
    return this.tweeetModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ CreatedAt: -1 })
      .exec();
  }

  findOne(id: number) {
    return this.tweeetModel.findById(id);
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return this.tweeetModel.updateOne({ _id: id }, updateTweetDto).exec();
  }

  remove(id: number) {
    return this.tweeetModel.deleteOne({ _id: id }).exec();
  }
}
