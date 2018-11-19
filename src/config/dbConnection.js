const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: 'apeproducciones.com',
    user: "apemktco_temp",
    password: "Temporal00",
    database : 'apemktco_aplicacionesweb'
  })
};
