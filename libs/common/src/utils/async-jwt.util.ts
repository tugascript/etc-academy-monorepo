import jwt from 'jsonwebtoken';

export const generateToken = async <T>(
  payload: T,
  secretOrPrivateKey: string,
  time: number | string,
  algorithm: jwt.Algorithm = 'RS256',
): Promise<string> =>
  new Promise((resolve, rejects) => {
    jwt.sign(
      payload as Record<string, any>,
      secretOrPrivateKey,
      { expiresIn: time, algorithm },
      (error, token) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(token);
      },
    );
  });

export const verifyToken = async <T>(
  token: string,
  secretOrPublicKey: string,
  algorithms: jwt.Algorithm[] = ['RS256'],
): Promise<T> =>
  new Promise((resolve, rejects) => {
    jwt.verify(
      token,
      secretOrPublicKey,
      { algorithms },
      (error, payload: T) => {
        if (error) {
          rejects(error);
          return;
        }
        resolve(payload);
      },
    );
  });
