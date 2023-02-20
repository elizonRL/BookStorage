const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new Schema({
    libro: {
        type: String,
        require: true
    },
    cantidad: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("SaleBook", SaleSchema);