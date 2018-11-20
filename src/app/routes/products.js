const dbConnection = require('../../config/dbConnection');

module.exports = app => {
  const connection = dbConnection();
  console.log("CONNECTED");

  /* connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); */

  function handleDisconnect() {  
    /* connection.connect(function(err) {            
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });   */                                  
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                        
      } else {                                      
        throw err;                                 
      }
    });
  };
  
  handleDisconnect();
  
  app.get('/', (req,res) => {
    connection.query('SELECT * FROM products', (err, result) => {
      res.render('products/products', {
        products: result
      });
    });
  });

  app.post('/products', (req,res) => {
    const { name, price, description, category, status } = req.body;
    connection.query('INSERT INTO products SET?', {
      name,
      price,
      description,
      category,
      status
    }, (err, result) => {
      res.redirect('/');
    });
  });
}