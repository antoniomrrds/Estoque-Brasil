const mongoose =  require("mongoose");
const Product = mongoose.model('product',{
    name:{
        type: String,
        required: true
    },
    provider:{
        type: mongoose.Types.ObjectId, ref: 'provider' 
    },
    name:{
        type: String,
        required: true
    },
    category:{
         type: mongoose.Types.ObjectId, ref: 'category' 
    },
    theAmount:Number,
    value:Number



})


module.exports = Product