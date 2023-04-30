import type { Logger } from "pino";
export interface ILoggerOptions {
  app?: string;
  layer?: string;
  info?: string;
}

export interface ILogger {
  init: (data?: Record<string, unknown>) => Logger;
  metadata: (data: Record<string, unknown>) => { init: () => Logger };
}

export type tPinoLogger = Logger;
