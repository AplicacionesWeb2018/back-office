const dbConnection = require('../../config/dbConnection');
const mysql = require('mysql');

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
    const connection = dbConnection();                             
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
      setInterval(function () {
        connection.query('SELECT 1');
      }, 5000);
      res.render('pages/products', {
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
};