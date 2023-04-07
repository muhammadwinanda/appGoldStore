const mongoose = require('mongoose');

// mo

const notaSchema = new mongoose.Schema({
    dateNota : {
        type : Date,
        default : Date.now
    },
    item : [
        {row1 : 
            {
                namaItem : {
                    type : String,
                    required : true
                },
                jenisItem : {
                    type : String,
                    required : true
                },
                kadarItem : {
                    type : String,
                    required : true
                }
            }
        },
        {row2 : 
            {
                namaItem : {
                    type : String,
                    required : true
                },
                jenisItem : {
                    type : String,
                    required : true
                },
                kadarItem : {
                    type : String,
                    required : true
                }
            }
        },
        {row3 : 
            {
                namaItem : {
                    type : String,
                    required : true
                },
                jenisItem : {
                    type : String,
                    required : true
                },
                kadarItem : {
                    type : String,
                    required : true
                }
            }
        },
    ],
    totalMoney : {
        type : Number,
        max : 12,
        required : true
    }
});

const dataNota = mongoose.model('nota', notaSchema);

module.exports = {dataNota}