const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');

app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  })
);
app.use(flash());

const {body} = require('express-validator');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended:true }));

const {checkData, checkDataNew, addData, updateData, checkDataName, updateTrxFromUser} = require('./public/js/javascript.js');

router.get('/', (req, res)=>{
  res.render('index', {
    info : req.flash('info'),
    success : req.flash('success')
  });
});

router.post('/login', (req, res)=>{
  const waktu = new Date().toLocaleString();
  const status = 'active';
  const check = checkData(req.body.username, req.body.password);
  const hapus = checkData(req.body.username, req.body.password);
  if (!check) {
    req.flash('info', 'account not found');
    return res.redirect(302,'/');
  } else if(check.status === 'not active') {
    req.flash('info', 'Your account has closed the transaction');
    return res.redirect(302, '/');
  } else {
    check.waktu = waktu;
    check.status = status;
    updateData(hapus); 
    addData(check);
    req.flash('usr', req.body.username);
    res.render('admin', {
      usernameLogin : req.flash('usr')
    }); 
  }
});

router.get('/tutup-laporan/:username', (req,res)=>{
  const closeTransaction = new Date().toLocaleString();
  const account = checkDataName(req.params.username);
  if (!account) {
    res.status(404);
    res.send('<h1> Page Not Found </h1>');
  } else {
    const change = Object(account);
    change.status = 'not active';
    change.closeTransaction = closeTransaction;
    updateTrxFromUser(change);
    res.redirect('/');
  }
})

router.post('/add', (req, res) =>{
  const check = checkDataNew(req.body.username, req.body.email);
  if (check !== undefined) {
    req.flash('info', 'account already registered');
    res.redirect(302, '/');
    return;
  } else {
    addData(req.body);
    req.flash('success', 'the account add successfull');
    res.redirect('/');
    return;
  }  
  });

app.use('/', router, (req, res)=>{
  res.status(404);
  res.send('<h1>Page Not Found</h1>');
});
app.listen(process.env.port || 3000);

console.log('Success, http://localhost:3000/');