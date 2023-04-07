const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index', {
      info : req.flash('info'),
      success : req.flash('success')
    });
  });

module.exports = router;

