var assert = require('assert');
const mysql = require('mysql');

// MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.MYSQL_SERVICE_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'database-user',        // Use the env variables you set
  password: process.env.MYSQL_PASSWORD || 'database-password',
  database: process.env.MYSQL_DATABASE || 'database-name'
});

(function() {
  'use strict';

  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database!');

    // Run tests after successful MySQL connection
    equal('should pass', function() {
      assert(1 === 1);
    });

    // Example: Query the database (optional - you can add more as needed)
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is:', results[0].solution);  // Expected output: 2
    });
    
    // Close the connection after the query
    connection.end();
  });

  function equal(desc, fn) {
    try {
      fn();
      console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
      console.log("Add your tests in this ./test directory");
    } catch (error) {
      console.log('\n');
      console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
      console.error(error);
    }
  }

})();
