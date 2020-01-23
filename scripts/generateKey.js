const debug = require('debug')('scripts:key');
const chalk = require('chalk');
const crypto = require('crypto');

function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
  }
  

  const token = generateRandomToken()

  console.log(chalk.green(`token: ${token}`));