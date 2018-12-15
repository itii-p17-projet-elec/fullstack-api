var mysql = require('promise-mysql');
var connexion;

mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "solarcharger",
  password: "solarcharger",
  database: "solarcharger"
}).then(function (con) {
  connexion = con;
  console.log('connected to database');
  // con.end(); 
  // console.log('log out');
});

// Routes
module.exports = {
  insert: function (req, res) {
    var name = req.body.name;
    var value = req.body.value;
    if (name == null || value == null) {
      res.status(400).json({ error: 'missing parameters' });
      return;
    }
    // var sqlStatement = 'INSERT INTO data (name, value) VALUES (' + connection.escape(name) + ', ' + connexion.escape(value);
    var sqlStatement = "INSERT INTO data (name, value) VALUES (" + name + "', '" + value + "')";
    console.log("statement is " + sqlStatement);
    connexion.query(sqlStatement, function (err, res, fields) {
      if (err) {
        // res.status(400).json({ status: 'error in statement' });
        console.log(err);
        return;
      }
      // res.status(200).json({ status: 'success' });
      console.log('successful insertion with result ' + res);
    });
    res.status(200).json({ status: 'undefined' });
  },
  select: function (req, res) {
    var id = req.body.id;
    var sqlStatement = 'SELECT * FROM data WHERE id=' + connexion.escape(id);
    console.log("statement is " + sqlStatement);
    connexion.query(sqlStatement).then(function (rows) {
      console.log(rows);
      res.status(200).json(rows);
      // connexion.end();
    }).catch(function (err) {
      res.status(400).send(err);
    });
  }
};