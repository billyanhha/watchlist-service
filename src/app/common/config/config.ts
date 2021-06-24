const dotenv = require('dotenv');

dotenv.config();

const getMongodbUrl = () => {
    if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
      }
      const userNamePwd = process.env.MONGODB_USERNAME ? `${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@` : '';
      const mongodbProtocol = process.env.MONGODB_PROTOCOL ? process.env.MONGODB_PROTOCOL : 'mongodb'; // To support srv records
      let mongodbUrl = `${mongodbProtocol}://${userNamePwd}${process.env.MONGODB_HOSTS}`;
      mongodbUrl += `/${process.env.MONGODB_NAME}?authSource=admin&retryWrites=true`;
      if (process.env.MONGODB_REPLICA_SET) {
        mongodbUrl += `&replicaSet=${process.env.MONGODB_REPLICA_SET}`;
      }
      return mongodbUrl;
}

const mongodbUrl = getMongodbUrl();

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    mongodbUrl: mongodbUrl
}