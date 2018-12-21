// Imports
var express = require('express');
var router = express.Router();
var databaseCtrl = require('./routes/databaseCtrl');

// Middleware that is specific to this router
router.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API'
  })
});

router.post('/database/insert', databaseCtrl.insert);
router.get('/database/select', databaseCtrl.select);

module.exports = router;