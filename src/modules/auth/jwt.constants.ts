require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '83lP0DKu0078Po12340c9f8Pp0KMx73',
};