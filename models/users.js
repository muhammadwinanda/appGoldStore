const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    level: {
        type: String,
        require: true,
    },
    absenHari: {
        type : String
    },
    absenWaktu : {
        type : String
    },
    keterangan: {
        type: String,
        default: "not active"
    }
});

const dataUsers = mongoose.model('users', userSchema);

module.exports = {dataUsers}

// percobaan simpan data dengan memanggil file pada termila = node ./config/database
// const coba =  new dataUsers({
//     username: "nanda",
//     email: "nanda@gmail.com",
//     password: "123456",
//     level: "mitra"
// });

// coba.save().then((kembalikan)=> console.log("berhasil disimpan ke DB", kembalikan)).catch(()=> console.log("gagal simpan data"));