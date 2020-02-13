var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
      host: 'dbfastpay.cxojhkallsvs.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'sempreit',
      database: 'db_fastpay'
		});
}

module.exports = function() {

	return createDBConnection;
}
