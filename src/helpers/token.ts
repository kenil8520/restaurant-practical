import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();

interface User {
    email: string;
    id: string;
}

const generateTokens = (user: User): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
      {
          user: {
              email: user.email,
              id: user.id,
          },
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '60m' }
  );

  const refreshToken = jwt.sign(
      {
          user: {
              id: user.id,
          },
      },
      process.env.JWT_SECRET as string ,
      { expiresIn: '1d' }
  );

  return { accessToken, refreshToken };
};

export const decodeToken = (token:string) => {
    try {
      let tokenWithoutBearer = token.split(' ')[1];
      let decodedToken: JwtPayload | null = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string) as JwtPayload;
      return decodedToken
    } catch (error) {
      return null;
    }
  }


export { generateTokens };
