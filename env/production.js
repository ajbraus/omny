var port = process.env.PORT;

module.exports = {
  port: port,
  db: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET
};