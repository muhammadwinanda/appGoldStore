const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

module.exports = router;

// app.use(express.static(__dirname + '/public'));
// const {loadData} = require('./public/js/javascript.js');

// require('./config/database');
// const {dataUsers} = require('./models/users');

// router.get('/admin', (req, res)=>{
//   // load data user dari colecction mongoDB
  
//   // end
//     const usersLoad = loadData();
//     const userFilter = usersLoad.filter(user=> user.waktu === new Date().toLocaleDateString());
//     const twoValues = userFilter.map(obj => ({username: obj.username, email: obj.email}));
//     res.render('admin', {
//       userActive : twoValues,
//       username : req.cookies.getUsername
//     });
//   });

// module.exports = router;