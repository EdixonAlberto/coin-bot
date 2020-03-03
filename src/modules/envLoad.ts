import dotenv from 'dotenv';
import { resolve } from 'path';

function envLoad(): void {
  const NODE_ENV: string = process.env.NODE_ENV || 'development';

  if (NODE_ENV === 'development') {
    const path: string = resolve('.env');
    const result = dotenv.config({ path });

    if (result.parsed) console.log('>> ENV -> OK');
    else throw new Error('>> ENV: ERROR ' + result.error);
  }
}

export default envLoad();
