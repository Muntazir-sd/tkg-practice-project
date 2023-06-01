const mongoose = require("mongoose");

const student = require("../schema/student")
const course = require("../schema/course")

const examSchema  = new mongoose.Schema({
    courseId:[{
        type: "ObjectId",
        ref:'course'
    }],
    studentId:[{
        type:"ObjectId",
        ref:'student'
    }],
    DateofExam:{
        type:Date,
        default:new Date(),
        required:true
    },
    DateofResult:{
        type:Date,
        default:new Date(),
        required:true
    },
    result:{
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Student_Course = mongoose.model("student_course",examSchema)

module.exports = Student_Course