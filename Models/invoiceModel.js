const mongoose = require('mongoose');



const invoiceSchema = new mongoose.Schema({
    "Customer Name": {
        type: String,
        required: true
    },
    "Invoice Number": {
        type: String,
        required: true,
        unique: true
    },
    "Errors": {
        type: Array,
        required: true
    },
    "Date": {
        type: String,
        required: true
    },
    "Items": {
        type: Array,
        required: true
    },
    "Total Amount": {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Invoice', invoiceSchema)