var port = 1337;

module.exports = {
  port: port,
  db: 'mongodb://localhost/omny',
  TOKEN_SECRET: process.env.TOKEN_SECRET
};