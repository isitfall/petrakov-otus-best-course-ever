import jwt from 'jsonwebtoken';
import { commonEnv } from '../env';

export const generateJwtToken = (payload: object): string => {
    console.log('payload', payload);
    // @ts-expect-error
    return jwt.sign(payload, commonEnv.JWT_SECRET, { expiresIn: commonEnv.JWT_EXPIRES_IN || '24h' });
};

export const verifyJwtToken = (token: string): any => {
    try {
        return jwt.verify(token, commonEnv.JWT_SECRET);
    } catch (error) {
        return null;
    }
};