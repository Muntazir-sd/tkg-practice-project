const express = require("express");
const Course = require("../schema/course")
const { handleAsync } = require('../middleware/error/error');
let router = express.Router();

router.use(express.json())
  
router.route("/")
  // <--  ***  /api/course/ ***  GET --> 
.get(handleAsync(async(req,res)=>{
    // Fetching all course documents from the course collection
        const allCourses = await Course.find({})
        res.status(200).json(allCourses)
    }))
  // <--  ***  /api/course/ ***  POST --> 
.post(handleAsync(async(req,res)=>{
    // Creating a new course document in the course collection      
        const newCourse = await Course.create({
          NAME: req.body.NAME,
          COURSENAME: req.body.COURSENAME,
          DURATION: req.body.DURATION,
          DTYPE: req.body.DTYPE,
          FEES: req.body.FEES,
          TYPE: req.body.TYPE,
        })
        res.status(200).json(newCourse)  
    }))


router.route("/:id")
  // <--  ***  /api/course/:id ***  GET --> 
.get(handleAsync(async(req, res) => {
    // Fetching an individual course document by ID from the course collection   
        const { id } = req.params
        const course = await Course.findById(id)
        res.status(200).json(course)
    }))
  // <--  ***  /api/course/:id ***  PUT --> 
.put(handleAsync(async(req,res)=>{
    // Updating an existing course document in the course collection by ID   
        const { id } = req.params
        const courseToUpdate = await Course.findByIdAndUpdate(id, req.body)
        if (!courseToUpdate) return res.status(404).json({ message: `Cannot find course with ID ${id}` })        
        const updatedCourse = await Course.findById(id)
        res.status(200).json(updatedCourse)
    }))
  // <--  ***  /api/course/:id ***  DELETE --> 
.delete(handleAsync(async(req,res)=>{
    // Deleting a course document from the course collection by ID    
        const { id } = req.params
        const deletedCourse = await Course.findByIdAndDelete(id)
        if (!deletedCourse) return res.status(404).json({ message: `Cannot find course with ID ${id}` })            
        res.status(200).json({ message: `course with ID ${id} has been deleted` })
    }))
 

module.exports = router;
