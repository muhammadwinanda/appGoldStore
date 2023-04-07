require('../config/database');
const {dataUsers} = require('../models/users.js');

module.exports = {
    viewDashboard : async (req, res) => {
        try{
            // mitra active in Date Now
            const mitraLogin = req.cookies.getUsername;
            const mitraOnline = await dataUsers.find({username : {$eq: mitraLogin}}).lean();
            const online = mitraOnline.map(obj => (obj.absenWaktu));
            // end
            res.render('mitra/dashboard/view_dashboard',{
            username : req.cookies.getUsername.toUpperCase(),
            absen : online
          });
          }catch(err){
            res.redirect('/');
            console.log(err);
          }
    }
}