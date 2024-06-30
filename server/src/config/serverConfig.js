import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const DOMAIN_NAME = process.env.DOMAIN_NAME;