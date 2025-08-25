import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosError } from 'axios';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL || `http://localhost:${PORT}`;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  //   @Cron('*/10 * * * * *')
  @Cron('0 */10 * * * *')
  async handleCron() {
    // https://github.com/axios/axios/issues/3612

    try {
      await axios.get(WEBHOOK_URL);
      this.logger.debug('Called every 10 minutes: ' + new Date().toISOString());
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (!axios.isAxiosError(errors)) {
        // do whatever you want with native error
      }
      // do what you want with your axios error
    }
  }
}
