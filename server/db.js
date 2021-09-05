const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'username',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DB || 'database_name'
});

function connectionCheck() {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        if (connection) connection.release();
        reject(err);
      } else {
        resolve('success');
      }
    });
  });
}

function connectionRelease() {
  db.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
  });
}

module.exports = function dbQuery(query) {
  return connectionCheck().then(() => {
    return new Promise((resolve, reject) => {
      db.query(query, (error, res, fields) => {
        connectionRelease();
        if (!error) {
          resolve(res);
        } else {
          console.error(error);
          reject(error);
        }
      });
    });
  });
};