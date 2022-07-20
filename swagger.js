const swaggerAutogen = require('swagger-autogen')();

const output = './swagger_output.json';
const endpoints = ['./app.js'];

swaggerAutogen(output, endpoints);