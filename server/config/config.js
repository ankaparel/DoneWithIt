const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  secretkey: process.env.SECRETKEY,
  localDB: process.env.LOCALDB,
  atlasDB: process.env.ATLASDB
};