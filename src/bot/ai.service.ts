import { Injectable } from '@nestjs/common';
import { Bot, Context } from 'grammy';
import { GoogleService } from 'src/google/google.service';
import telegramifyMarkdown from 'telegramify-markdown';
import { Utils } from './utils/utils';

@Injectable()
export class AiService {
  private bot: Bot;

  constructor(private googleService: GoogleService) {}

  initBot(bot: Bot) {
    this.bot = bot;

    Utils.mapCommand(this.bot, [{ command: 'ai', fun: this.ai }], this);
  }

  async ai(ctx: Context, self: this) {
    const promt = ctx.match?.toString() || '';
    try {
      if (!promt) {
        await ctx.reply('No prompt');
        return;
      }

      const result = await self.googleService.runGemini(promt);

      await ctx.reply(telegramifyMarkdown(result, 'escape'), {
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
