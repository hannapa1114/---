require('dotenv').config();

module.exports =
{
  "development": {
    "username": "root",
    "password": process.env.DATABASE_PASSWORD,
    "database": "Chaegjango",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DATABASE_PASSWORD,
    "database": "Chaegjango",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.DATABASE_PASSWORD,
    "database": "Chaegjango",
    "host": "chaegjango.cyil27xtrdkk.ap-northeast-2.rds.amazonaws.com",
    "port": process.env.PORT,  
    "dialect": "mysql"
  }
}

