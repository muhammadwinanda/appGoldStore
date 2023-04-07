const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/appWeb').then(() => console.log('Connected!, terhubung ke DB')).catch(()=> console.log('Failed connection'));