const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    NAME:{
        type:String,
        required:true
    },
    COURSENAME:{
        type:String,
        required:true
    },
    DURATION:{
        type:Number,
        required:true
    },
    DTYPE:{
        type:String,
        enum:["Month","Year","Week"],
        required:true
    },
    FEES:{
        type:Number,
        required:true
    },
    TYPE:{
        type:String,
        enum:["Professional","Academic"],
        required:true
    }
},
{
    timestamps:true
})


const Course = mongoose.model("course",courseSchema)

module.exports = Course