const express = require('express');
const productsController = require('./controllers/productsController');
// const productsRoute = require('./routes/products');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
// app.use('/products', productsRoute);
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);

app.use((err, req, res, _next) => {
  const { message, name } = err;
  switch (name) {
    case 'NotFoundError':
      return res.status(404).json({ message });
    default:
      return res.status(500).json({ message });
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;