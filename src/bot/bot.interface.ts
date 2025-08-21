import { Context } from 'grammy';

export type CommandType<T> = {
  command: string;
  fun: (ctx: Context, self: T) => Promise<void>;
};

export type ButtonType<T> = {
  trigger: string;
  fun(ctx: Context, self: T): Promise<void>;
};
