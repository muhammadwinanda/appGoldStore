const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const path = require('path');

app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  })
);
app.use(flash());

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/page-admin', express.static(path.join(__dirname + '/node_modules/startbootstrap-sb-admin-2')));
app.use('/page-mitra', express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended:true }));

const indexRouter = require('./routes/index'); //masih dipakai, karna tidak ad validasi dari file app.js. kedepan, admin dan mitra harus bisa di routes
const adminRouter = require('./routes/admin');
const mitraRouter = require('./routes/mitra');

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/mitra', mitraRouter);

const {checkData, checkDataNew, addData, updateData, checkDataName, updateTrxFromUser, loadData} = require('./public/data/controller/users.js');

require('./config/database');
const {dataUsers} = require('./models/users');
const {dataTransaction} = require('./models/transactions');

const moment = require('moment');

app.post('/login', async(req, res)=>{
  try{
    const {username, password} = req.body;
    const check = await dataUsers.findOne({username: username});
    if(!check){
      // block code, Object not found
      req.flash('info', 'account not found');
      res.redirect('/');
      return;
    }
    if (check.password === password) {
      // block code, success validasi username & password
      const hari = moment().format('DD/MM/YYYY');
      const waktu = moment().format('H:m:s');
      const status = 'active';
      // validasi dari user yang login, jika hari sama saat login, maka absen waktu jangan ditambahkan atau di simpan.
      if (check.absenHari === hari) {
        check.absenWaktu = null;
      } else {
        check.keterangan = status;
        check.absenHari = hari;
        check.absenWaktu = waktu;
        await check.save();
      }
      // kode validasi di atas masih salah
        if (check.level === 'admin') {
          res.cookie('getUsername', req.body.username);
          res.redirect('/admin/dashboard'); //root dari folder controllers
        } else {
          res.cookie('getUsername', req.body.username);
          req.flash('usr', req.body.username);
          res.redirect('/mitra/dashboard'); //root dari folder controllers
        }
    } else {
      // block code, password not found for Object.username
      req.flash('info', 'account not found');
      res.redirect('/');
      return;
    } 
  } catch (err) {
    console.log("server error", err);
    res.redirect('/');
    return;
  }
});

app.get('/tutup-laporan/:username', async (req,res)=>{
  // buat kode, tutup laporan dengan validasi mongodb
  const closeTransaction = new Date().toLocaleString();
  const urlUsername = req.params.username;
  const account = await dataUsers.find({$and: [{username: urlUsername}, {level: "mitra"}] });
  if (!account) {
    res.status(404);
    res.send('<h1> Page Not Found </h1>');
    return
  }
  const change = Object(account);
  change.status = 'not active';
  change.closeTransaction = closeTransaction;
  updateTrxFromUser(change);  
  res.redirect('/');

  // const closeTransaction = new Date().toLocaleString();
  // const account = checkDataName(req.params.username);
  // if (!account) {
  //   res.status(404);
  //   res.send('<h1> Page Not Found </h1>');
  // } else {
  //   if (account.level === 'mitra') {
  //     const change = Object(account);
  //     change.status = 'not active';
  //     change.closeTransaction = closeTransaction;
  //     updateTrxFromUser(change);  
  //   }
  //   res.redirect('/');
  // }
})

app.post('/add', (req, res) =>{
  const listUser = new dataUsers({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    level: req.body.level
  });
  const searchUsername = req.body.username;
  const searchEmail = req.body.email;
  dataUsers.findOne({$or: [{username: searchUsername},{email: searchEmail}] }, (err, result)=>{
    // process searching user from MongoDb
    if(err) throw err;
    if (result){
      req.flash('info', 'account already registered');
      res.redirect(302, '/');
    } else {
      //save data with mongodb use library Mongoose
      listUser.save().then((success)=>{
        req.flash('success', 'the account add successfull');
        return res.redirect('/');
      // end
      }).catch((err)=>{
        console.log('gagal simpan', err);
      });
    }
  });  
});

app.use('/', router, (req, res)=>{
  res.status(404);
  res.send('<h1>Page Not Found</h1>');
});
app.listen(process.env.port || 3000);

console.log('Success, http://localhost:3000/');