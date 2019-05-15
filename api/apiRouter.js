// Imports
var express = require('express');
var router = express.Router();
var databaseCtrl = require('./routes/databaseCtrl');
var usersCtrl = require('./routes/usersCtrl');

// Middleware that is specific to this router
router.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API'
  })
});

// Database's routes
router.post('/db/insert/', databaseCtrl.insert);
router.get('/db/select/', databaseCtrl.select);
router.put('/db/modify/', databaseCtrl.modify);

// User's routes
router.post('/user/register/', usersCtrl.register);
router.post('/user/login/', usersCtrl.login);
router.get('/user/profile/', usersCtrl.getUserProfile);

module.exports = router;