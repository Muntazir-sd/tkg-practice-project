const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        max: 100
    },
    Lastname: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        default: "today",
        required: true
    },
    StudentNO: {
        type: Number,
        required: true,
        unique:true
    },
    Email:{
        type:String,
        required:true   
    },
    Department: {
        type: String,
        required: true
    },
    DateOfAdmission: {
        type: Date,
        default: "today",
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    StudentPhoto:{
        type:String,
    }
}, {
    timestamps: true
})



const Student = mongoose.model("student", studentSchema)
module.exports = Student









