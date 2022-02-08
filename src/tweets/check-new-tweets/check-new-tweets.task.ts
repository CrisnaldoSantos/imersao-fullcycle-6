import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { TweetsService } from '../tweets.service';

@Injectable()
export class CheckNewTweetsTask {
  private limit = 10;

  constructor(
    private tweetService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
    @InjectQueue('emails')
    private emailQueue: Queue,
  ) {}

  @Interval(5000)
  async handle() {
    console.log('procurando tweets...');
    let offset: number = await this.cache.get<number>('tweet-offset');
    offset = offset === undefined || offset === null ? 0 : offset;

    console.log(`offset = ${offset}`);

    const tweets = await this.tweetService.findAll({
      offset,
      limit: this.limit,
    });
    console.log(`Tweets count = ${tweets.length}`);

    if (tweets.length === this.limit) {
      console.log('achou mais tweets');
      await this.cache.set('tweet-offset', offset + this.limit, {
        ttl: 1 * 60 * 10,
      });
      this.emailQueue.add({});
    }
  }
}
