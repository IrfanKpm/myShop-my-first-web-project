const dotenv = require('dotenv');

dotenv.config({path:"./config.env"})


  // server config
const PORT = process.env.PORT;


  // DB config
const DB_uri = process.env.DB_uri;


 // admin
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PWD = process.env.ADMIN_PWD;


module.exports = {PORT,DB_uri,ADMIN_USERNAME,ADMIN_PWD}
