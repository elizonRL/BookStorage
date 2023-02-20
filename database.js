const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://elizon:elizon1494@cluster0.vkyda.mongodb.net/books-storange?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is conected'))
    .catch(err => console.log(err));