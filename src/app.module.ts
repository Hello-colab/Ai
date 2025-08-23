import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [BotModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
