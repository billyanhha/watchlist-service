import mongoose from 'mongoose';
import { Logger } from '../../config/logger';

const logger = new Logger(module);

export class Connection {
  static async connectDB(url: string) {
    try {
      if (url !== '') {
        await this.connectMongoose(url);
        // await createCollections();
      }
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }

  static async connectMongoose(url: string) {
    await mongoose.connect(url,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false,
      });

    mongoose.connection.on('error', () => {
      logger.error('Mongo Db connection error');
      process.exit(1);
    });
    logger.info('Successfully connected to MongoDB');
  }
}
