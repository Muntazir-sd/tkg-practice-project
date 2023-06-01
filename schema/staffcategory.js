const mongoose = require("mongoose")


const staffCategory = new mongoose.Schema(
{
    category:{
        type:String,
        enum:["admin","teacher","helper"]
    }
},
{
    timestamps:true
})
const StaffCategory = mongoose.model("staff_category",staffCategory)

module.exports = StaffCategory
