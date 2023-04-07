require('../config/database');
const {dataUsers} = require('../models/users.js');
const moment = require('moment');

module.exports = { 
    viewDashboard : async (req, res) => {
      // ternyata, pada suatu FUNCTION bisa di campur 2 methode calback yang berupa async await dengan promise (callback)
      const mitraAktif = await dataUsers.countDocuments({level:'mitra'}); 
      const dateNow = new Date().toLocaleDateString('id-ID',{day: '2-digit',month:'2-digit', year:'numeric'});
      // format pemisah pada tanggal adalah "/", maka dari itu saya merubah format pada library moment()

      dataUsers.find({$and: [{absenHari: {$eq: dateNow}},{level: {$ne: "admin"} }]}).lean()
      .then((usersActive)=>{
        const values = usersActive.map(obj => ({username: obj.username, absenWaktu: obj.absenWaktu, keterangan: obj.keterangan}));
        res.render('admin/dashboard/view_dashboard', {
          partnerUser : mitraAktif,
          userActive : values,
          username : "Muhammad Winanda"
        });
      }).catch((err)=>{
        console.log('no active users',err);
      });
  },
    
}