const express = require('express');
const swaggerUi = require('swagger-ui-express');
const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');
const swaggerDocument = require('./swagger_output.json');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
 response.send();
});

app.use(express.json());
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },
}));

app.use((err, req, res, _next) => {
  const { message, name } = err;
  switch (name) {
    case 'NotFoundError':
      return res.status(404).json({ message });
    case 'ConflictError':
      return res.status(409).json({ message });
    case 'UnprocessableError':
      return res.status(422).json({ message });
    case 'BadRequestError':
      return res.status(400).json({ message });
    default:
      return res.status(500).json({ message });
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;