import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { GoogleModule } from './google/google.module';
import { TasksService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot(), BotModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
