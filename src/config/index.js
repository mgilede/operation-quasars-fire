require('dotenv').config();

let config = {
  dbUrl: process.env.ATLAS_URI,
  port: process.env.PORT,
};

module.exports = config;