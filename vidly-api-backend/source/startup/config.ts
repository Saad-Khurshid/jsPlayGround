import dotenv from 'dotenv';

dotenv.config();

export default () => {
    if (
        !process.env.MONGO_URL ||
        !process.env.SERVER_HOSTNAME ||
        !process.env.SERVER_PORT ||
        !process.env.JWT_SECRET_KEY
    ) {
        throw new Error('FATAL ERROR: .env is missing.');
    }
};
