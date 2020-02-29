import { config as envConfig } from 'dotenv';

envConfig({
  path: './.env'
});

const ENV: NodeJS.ProcessEnv = process.env;

const config: TConfig = {
  token: ENV.BOT_TOKEN || ''
};

export default config;
