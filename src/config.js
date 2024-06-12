import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_MONGOURI = process.env.DB_MONGOURI;
export const DB_MONGOTABLEEMPLOYEES = process.env.DB_MONGOTABLEEMPLOYEES;
export const DB_MONGOTABLEUSERS = process.env.DB_MONGOTABLEUSERS;
export const JWT_SECRET = process.env.JWT_SECRET;