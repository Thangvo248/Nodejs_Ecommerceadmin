const mongoose = require('mongoose');
const env = require('dotenv');
async function connect(){
    try {
        await mongoose.connect('mongodb+srv://thangvo:231236@cluster0.fprxi.mongodb.net/ptudweb_ecommerce_dev?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('thanhcong');
    } catch (error) {
        console.log('fails');
    }
}

module.exports={connect};