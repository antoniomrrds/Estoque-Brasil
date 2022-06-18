const mongoose =  require("mongoose");

const Category = mongoose.model('category',{
    name:{
        type: String,
        unique: true,
        required: true
    }
})
module.exports = Category