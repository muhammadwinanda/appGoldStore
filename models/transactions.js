const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transactionsSchema = new mongoose.Schema({
   dateTransaction : {
    type : Date,
    default : Date.now
   },
    notaId : {
    _id: {
        type : ObjectId,
        ref : "nota",
        required : true
    }
   },
   purchase : {
    _id : {
        type : ObjectId,
        ref : "users",
        required : true
    }
   },
   sell : {
    _id : {
        type : ObjectId,
        ref : "users",
        required : true
    }
   },
   paymentCash : {
    type : String
   },
   paymentNoCash : {
    bankName : {
        type : String,
        required : true
    },
    noRek : {
        type : Number,
        required : true
    }
   },
   totalMoney : {
    type : Number,
    max : 12,
    required : true
   }
});

const dataTransaction = mongoose.model('transaction', transactionsSchema);

module.exports = {dataTransaction}

// const coba =  new dataTransaction({
//     dateTrx : new Date(),
//     users_id: "63f988d3dc17cba4fa19bc63",
//     pembelian_id: "null",
//     penjualan_id: "null",
//     keterangan: "false",
// });

// coba.save().then((hasil)=> console.log("berhasil disimpan ke DB", hasil)).catch(()=> console.log("gagal simpan data"));