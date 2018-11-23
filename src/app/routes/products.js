const dbConnection = require('../../config/dbConnection');
let mailer = require('../js/mailer');

let sqlupdate = 'UPDATE products SET status = ? WHERE id_products = ?';
let sqldelete = 'DELETE FROM products WHERE id_products = ?';
let womenurl = 'https://www.dealsshutter.com/blog/wp-content/uploads/2018/05/womens-fashion-clothes-catalogs.jpg';
let menurl = 'https://fashionstanew.files.wordpress.com/2016/11/mens-clothing.jpg';
let kidsurl = 'https://techcrunch.com/wp-content/uploads/2016/07/14_lifestyle_dbl_roa_038.jpg?w=730&crop=1';
var url = 'placeholder';

module.exports = app => {
  const connection = dbConnection();
  console.log("CONNECTED");

  function handleDisconnect() {    
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
    let cat = req.body.category;
    switch (cat) {
      case 'women':
        url = womenurl
        break;
      case 'men':
        url = menurl
        break;
      case 'kids':
        url = kidsurl
        break;
      default:
        url = 'error'
    }
    connection.query('INSERT INTO products SET?', {
      name,
      price,
      description,
      category,
      status,
      url
    }, (err, result) => {
      res.redirect('/');
      console.log(cat);
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