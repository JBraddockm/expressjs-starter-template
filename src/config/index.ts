import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

export const port = process.env.PORT || 3000;
export const authHeaderKey = 'X-KRYSP-AUTH';
export const node_env = process.env.NODE_ENV || 'development';
