const mongoose = require('mongoose');
// anything that will interact with the db for that we need mongoose

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;