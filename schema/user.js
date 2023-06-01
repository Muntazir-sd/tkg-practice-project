const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     
    username:{
        type:String,
        required:true
    },
    Mob:{
        type:Number,
        required:true   
    },
    Email:{
        type:String,
        required:true   
    },

    Password:{
    type:String,
        required:true   
    }
},{
    timestamps:true
})



const User = mongoose.model("user",UserSchema)

module.exports = User