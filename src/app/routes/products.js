const dbConnection = require('../../config/dbConnection');
const mysql = require('mysql');
let mailer = require('../js/mailer');

let sqlupdate = 'UPDATE products SET status = ? WHERE id_products = ?';
let sqldelete = 'DELETE FROM products WHERE id_products = ?';

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

  app.post('/productsedit', (req,res) => {
    let data = [req.body.status, req.body.id_products];
    connection.query(sqlupdate, data, (error, results, fields) => {
      if (error){
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows, data);
      res.redirect('/');
    });
  });

  app.post('/productsdelete', (req,res) => {
    let data = [req.body.id_products];
    connection.query(sqldelete, data, (error, results, fields) => {
      if (error){
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows, data);
      res.redirect('/');
    });
  });

  app.post('/cleartable', (req,res) => {
    mailer.connect();
    mailer.sendMail();
    connection.query('TRUNCATE TABLE products');
    connection.query('DELETE FROM products', (err, result) => {
      res.redirect('/');
    });
    
  });
};