import { config as envConfig } from 'dotenv';

envConfig({
  path: './.env'
});

const ENV: NodeJS.ProcessEnv = process.env;

const config = {
  prefix: '$',
  token: ENV.BOT_TOKEN
};

export default config;
