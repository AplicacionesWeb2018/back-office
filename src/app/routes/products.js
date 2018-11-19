const dbConnection = require('../../config/dbConnection');

module.exports = app => {
  const connection = dbConnection();
  
  app.get('/', (req,res) => {
    connection.query('SELECT * FROM products', (err, result) => {
      res.render('products/products', {
        products: result
      });
    });
  });

  app.post('/products', (req,res) => {
    const { name, description } = req.body;
    connection.query('INSERT INTO products SET?', {
      name,
      description
    }, (err, result) => {
      res.redirect('/');
    });
  });
}