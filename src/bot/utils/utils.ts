import { Bot } from 'grammy';
import { ButtonType, CommandType } from '../bot.interface';

export const Utils = {
  mapCommand<T>(bot: Bot, list: CommandType<T>[], self: T) {
    list.forEach((e) => {
      bot.command(e.command, (ctx) => {
        e.fun(ctx, self).catch((error) => {
          console.error(`Error executing command ${e.command}:`, error);
        });
      });
    });
  },

  mapButton<T>(bot: Bot, list: ButtonType<T>[], self: T) {
    list.forEach((e) => {
      bot.callbackQuery(e.trigger, (ctx) => {
        e.fun(ctx, self).catch((error) => {
          console.error(`Error executing button ${e.trigger}:`, error);
        });
      });
    });
  },
};
