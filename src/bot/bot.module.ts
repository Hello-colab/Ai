import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { TestService } from './test.service';

@Module({
  providers: [BotService, TestService],
  controllers: [BotController],
})
export class BotModule {}
