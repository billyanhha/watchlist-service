import winston, { format, transports } from 'winston';
import { config } from './config';
import path from 'path';

export class Logger {
  private readonly winstonLogger: winston.Logger;

  constructor(private module: NodeModule) {
    const logFormat = format.printf(
      (info) => JSON.stringify({
        time: info.timestamp,
        level: info.level,
        message: info.message,
        module: this.getModuleName(module),
        correlationId: ''
      })
    );
    const transportList = [
      new transports.Console({
        format: format.combine(format.timestamp(), logFormat),
      }),
    ];

    this.winstonLogger = winston.createLogger({
      transports: transportList,
      exitOnError: false,
      silent: (config.env === 'test')
    });
  }
  /**
   * Get module dir
   * @param module
   * @returns module dir
   */
  private getModuleName(module: NodeModule): string {
    const BASE_PATH = path.resolve('.');
    const fileName = module.filename;
    return fileName.split(BASE_PATH)[1];
  }

  /**
   * Log a message with the level of "Debug".
   */
  debug(message: any): void {
    this.createLog('debug', message);
  }

  /**
   * Log a message with the level of "Info".
   */
  info(message: any): void {
    this.createLog('info', message);
  }

  /**
   * Log a message with the level of "Error".
   */
  error(message: any): void {
    this.createLog('error', message);
  }

  /**
   * Log a message with the level of "Warning".
   */
  warn(message: any): void {
    this.createLog('warn', message);
  }

  private createLog(level: string, message: any): void {
    const messageString =
      message instanceof Error && message
        ? `${message}\n${message.stack}`
        : message;
    this.winstonLogger.log(level, messageString);
  }
}
