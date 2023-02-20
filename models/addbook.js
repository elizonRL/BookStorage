const mongoose = require("mongoose");
const { Schema } = mongoose;
const BookSchema = new Schema({

    titulo: {
        type: String,
        require: true,
    },
    autor: {
        type: String,
        require: true,
    },
    cantidad: {
        type: String,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    edicion: {
        type: String,
        require: true,
    },
    precio: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Books", BookSchema);