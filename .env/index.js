const dotenv = require('dotenv');
const { resolve } = require('path');

function envLoad() {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (NODE_ENV === 'development') {
    const path = resolve('.env', `${NODE_ENV}.env`);
    const result = dotenv.config({ path });

    if (result.parsed) console.log('>> ENV -> OK');
    else throw new Error('>> ENV -> ' + result.error).message;
  }
}

envLoad();
