const ENV: NodeJS.ProcessEnv = process.env;

const config: TConfig = {
  token: ENV.DISCORD_TOKEN || '',
  alarmInterval: (Number(ENV.ALARM_INTERVAL_MINUTE) || 20) * 60000
};

export default config;
