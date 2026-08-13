import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), '../databases/dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });

export const db = new PrismaClient({ adapter });
