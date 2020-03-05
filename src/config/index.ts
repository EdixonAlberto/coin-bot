const ENV: NodeJS.ProcessEnv = process.env;

const config: TConfig = {
  nodeEnv: ENV.NODE_ENV || 'development',
  token: ENV.DISCORD_TOKEN || '',
  alarmInterval: (Number(ENV.ALARM_INTERVAL_MINUTE) || 0) * 60000
};

global.config = config;

console.log('>> CONFIG -> OK');
