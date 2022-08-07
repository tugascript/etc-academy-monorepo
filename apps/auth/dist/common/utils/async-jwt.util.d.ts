import jwt from 'jsonwebtoken';
export declare const generateToken: <T>(payload: T, secretOrPrivateKey: string, time: number | string, algorithm?: jwt.Algorithm) => Promise<string>;
export declare const verifyToken: <T>(token: string, secretOrPublicKey: string, algorithms?: jwt.Algorithm[]) => Promise<T>;
