import { Test, TestingModule } from '@nestjs/testing';
import { CheckNewTweetsTask } from './check-new-tweets.task';

describe('CheckNewTweetsTask', () => {
  let task: CheckNewTweetsTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckNewTweetsTask],
    }).compile();

    task = module.get<CheckNewTweetsTask>(CheckNewTweetsTask);
  });

  it('should be defined', () => {
    expect(task).toBeDefined();
  });
});
