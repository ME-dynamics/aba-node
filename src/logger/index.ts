import pino from "pino";
import hyperid from "hyperid";
import type { ILoggerOptions, ILogger, tPinoLogger } from "../types";

export function buildLogger(options: ILoggerOptions): ILogger {
  const isDev = process.env["NODE_ENV"] !== "production";
  const level = isDev ? "debug" : "info";
  const pinoLogger = pino({ level });
  const idGen = hyperid();

  function metadata(data: Record<string, unknown>) {
    return { init: () => init(data) };
  }

  function init(data?: Record<string, unknown>): tPinoLogger {
    const id = idGen();

    if (data) {
      return pinoLogger.child({ metadata: data, details: options, id });
    }

    return pinoLogger.child({ details: options, id });
  }

  return { init, metadata };
}
