import { Injectable } from '@nestjs/common';
import { Bot, Context } from 'grammy';
import { Utils } from './utils/utils';

@Injectable()
export class TestService {
  private bot: Bot;

  initBot(bot: Bot) {
    this.bot = bot;

    Utils.mapCommand(this.bot, [{ command: 'test', fun: this.test }], this);
  }

  async test(ctx: Context) {
    try {
      await ctx.reply('Test command executed successfully!');
    } catch (error) {
      console.error('Error executing test command:', error);
    }
  }
}
