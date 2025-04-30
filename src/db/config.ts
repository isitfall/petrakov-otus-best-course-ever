import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
    MONGODB_URI: str({default: 'mongodb://admin:admin@localhost:27017/best-course-ever?authSource=admin'}),
    MONGODB_DB: str({default: 'best-course-ever'}),
});

export default {
    uri: env.MONGODB_URI,
    db: env.MONGODB_DB,
}