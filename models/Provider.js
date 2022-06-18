const mongoose =  require("mongoose");

const Provider = mongoose.model('provider',{
    name:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },

})
module.exports = Provider