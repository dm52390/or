import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from 'dotenv';
import * as schema from './schema'

dotenv.config();

console.log({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT!) || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
})

const client = new Client({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT!) || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});
 
client.connect();
export const db = drizzle(client, { schema });