const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    typeofstaff:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"staff_category",
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
},{
    timestamps:true
})

const Staff = mongoose.model("staff",staffSchema)


module.exports = Staff