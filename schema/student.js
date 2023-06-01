const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({ 
    NAME: {
        type: String,
        required: true,
        max: 100
    },
    DOB: {
        type: Date,
        required: true
    },
    ADDRESS: {
        type: String,
        required: true
    },
    STD: {
        type: String,
        required: true
    },
    DOA: {
        type: Date,
        default: "today",
        required: true
    },
    TAGS: {
        type: [String],
        required: true
    }
},{
    timestamps: true
})



const Student = mongoose.model("student", studentSchema)
module.exports = Student









