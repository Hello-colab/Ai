import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Update } from 'grammy/types';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Post('webhook')
  async webhook(@Body() body: { update_id: string }) {
    if (!body?.update_id) return HttpStatus.FORBIDDEN;
    await this.botService.handleWebhookUpdate(body as unknown as Update);

    return HttpStatus.OK;
  }
}
