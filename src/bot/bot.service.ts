import { hydrate, HydrateFlavor } from '@grammyjs/hydrate';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { Bot, Context, InlineKeyboard } from 'grammy';
import { Update } from 'grammy/types';
import telegramifyMarkdown from 'telegramify-markdown';
import { ButtonType, CommandType } from './bot.interface';
import { TestService } from './test.service';
import { Utils } from './utils/utils';

export type MyContext = HydrateFlavor<Context>;

@Injectable()
export class BotService {
  private bot: Bot<MyContext>;
  private botStarted = false;
  private mapButtons: ButtonType<this>[] = [];
  private mapCommands: CommandType<this>[] = [];

  constructor(private testService: TestService) {
    this.init().catch((error) => {
      console.error('Failed to initialize bot:', error);
    });
  }
  async init() {
    try {
      this.bot = new Bot<MyContext>(process.env.BOT_TOKEN || '');
      const webhookUrl = (process.env.WEBHOOK_URL || '') + '/bot/webhook';
      await this.bot.api.setWebhook(webhookUrl);
      this.bot.use(hydrate());
      await this.bot.init();

      this.initCommands();
      this.testService.initBot(this.bot);

      this.botStarted = true;
    } catch (error) {
      console.error('Error initializing bot:', error);
    }
  }

  initCommands() {
    this.mapCommands = [{ command: 'start', fun: this.start }];
    this.mapButtons = [
      { trigger: 'delete', fun: this.deleteBtn },
      { trigger: 'help', fun: this.helpBtn },
    ];

    Utils.mapCommand(this.bot, this.mapCommands, this);
    Utils.mapButton(this.bot, this.mapButtons, this);
  }

  async start(ctx: MyContext) {
    try {
      const inlineKeyboard = new InlineKeyboard()
        .text('Delete', 'delete')
        .text('Help', 'help')
        .row()
        .text('Delete this message', 'delete');

      await ctx.reply('Welcome to the bot!', {
        reply_markup: inlineKeyboard,
      });
    } catch (error) {
      console.error('Error in start command:', error);
    }
  }

  async helpBtn(ctx: MyContext, self: this) {
    await self.help(ctx);
  }

  async help(ctx: MyContext) {
    const text = `*Help Menu:*
- Use /start to begin the interaction.
- Use /test to test.
- Click the button below to delete this message.`;
    try {
      await ctx.reply(telegramifyMarkdown(text, 'escape'), {
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.error('Error in help command:', error);
    }
  }

  async deleteBtn(ctx: MyContext) {
    const chatId = ctx?.update?.callback_query?.message?.message_id;

    if (!chatId) {
      console.error('No message ID found in callback query');
      return;
    }
    try {
      await ctx.deleteMessages([chatId]);
    } catch (error) {
      console.error('Error in delete button:', error);
    }
  }

  async handleWebhookUpdate(a: Update) {
    if (this.botStarted) {
      await this.bot.handleUpdate(a);
    }
  }
}
