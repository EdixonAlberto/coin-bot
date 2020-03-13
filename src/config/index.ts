const ENV: NodeJS.ProcessEnv = process.env;

const config: TConfig = {
  // Environments
  discordToken: ENV.DISCORD_TOKEN || '',
  alarmInterval: (Number(ENV.ALARM_INTERVAL_MINUTE) || 30) * 60000,
  exchange: {
    url: ENV.EXCHANGE_URL || '',
    account: {
      apiKey: ENV.API_KEY || '',
      secretKey: ENV.SECRET_KEY || ''
    }
  },
  // Internal
  modeDebug: ENV.NODE_ENV ? false : true,
  defaultAsset: 'BTC',
  decimalQty: {
    asset: 2,
    fiat: 3
  }
};

global.config = config;

console.log('>> CONFIG -> OK');
