import Bot from './modules/Bot';
// import DB from './database/DB';

async function main() {
  // const database = new DB({
  //   file: 'store.json'
  // });

  const bot = new Bot({
    prefix: '$',
    token: config.discordToken
  });

  // await database.create();
  await bot.start();
}

main();
