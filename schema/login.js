const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({

    user:String
    ,

    email:{
       type:String,
    //    unique:true
    },

    password:String,

    confirmpassword:String

},{
    timestamps:true
})

const Login = mongoose.model("login",loginSchema)

module.exports = Login