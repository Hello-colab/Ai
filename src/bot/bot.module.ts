import { Module } from '@nestjs/common';
import { GoogleModule } from 'src/google/google.module';
import { AiService } from './ai.service';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { TestService } from './test.service';

@Module({
  imports: [GoogleModule],
  providers: [BotService, TestService, AiService],
  controllers: [BotController],
})
export class BotModule {}
