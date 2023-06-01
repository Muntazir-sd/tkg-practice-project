const express = require("express")
const logger = require("./middleware/logger/logger")
const {errorHandler} = require('./middleware/error/error')
require('express-async-errors')
require('dotenv').config()
const mongoose = require("mongoose")
const student = require("./router/studentrouter")
const course = require("./router/courserouter")
const exam = require("./router/examrouter")
const staffCategory = require("./router/staffcategoryrouter")
const staff = require("./router/staffrouter")
const login = require("./router/loginrouter")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/student",student)
app.use("/api/course",course)
app.use("/api/staff",staff)
app.use("/api/staffcategory",staffCategory)
app.use("/api/login",login)
app.use("/api/exam",exam)
app.use(errorHandler)

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
  })

const mongo_test = process.env.mongo_test_url
const mongo = process.env.mongo_url

mongoose.connect(mongo_test)
.then(() => {
    logger.error("successfully conected to mongodb")

    app.listen(3000,()=>{
        logger.error("Server is running on port 3000")
    })
})
.catch((err) => {
    console.log(err)
})


