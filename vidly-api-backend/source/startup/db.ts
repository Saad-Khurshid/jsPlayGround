import mongoose from 'mongoose';
import logger from '../lib/logger';

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
const MONGO_URL = process.env.MONGO_URL;

export default () => {
    mongoose.connect(MONGO_URL as string, MONGO_OPTIONS).then((result) => {
        logger.info(`Mongodb connected: ${MONGO_URL}`);
    });
};
