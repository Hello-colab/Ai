import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { GoogleService } from 'src/google/google.service';
import telegramifyMarkdown from 'telegramify-markdown';
import { MyContext } from './bot.service';
import { Utils } from './utils/utils';

@Injectable()
export class AiService {
  private bot: Bot;

  constructor(private googleService: GoogleService) {}

  initBot(bot: Bot) {
    this.bot = bot;

    Utils.mapCommand(this.bot, [{ command: 'ai', fun: this.ai }], this);
  }

  async ai(ctx: MyContext, self: this) {
    const promt = ctx.match?.toString() || '';

    try {
      if (!promt) {
        await ctx.reply('No prompt');
        return;
      }

      const status = await ctx.reply('AI is thinking...', {
        reply_to_message_id: ctx.update.message?.message_id,
      });

      if (!status) return;

      const result = await self.googleService.runGemini(promt);

      if (!result) return;

      await status.editText(telegramifyMarkdown(result, 'escape'), {
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
