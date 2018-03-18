const api =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8080/Project1'
    : 'http://54.176.223.140:8080/Project1';

console.log('NODE_ENV', process.env.NODE_ENV);
module.exports = {
  api,
};
