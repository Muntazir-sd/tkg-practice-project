const express = require("express");
const Student = require("../schema/student");
const { handleAsync } = require('../middleware/error/error');
const router = express.Router();

router.use(express.json());

router.route("/")
// <--  ***  /api/student/ ***  GET -->
  .get(handleAsync(async (req, res) => {
    // Fetching all student documents from the student collection
    const students = await Student.find({});
    res.status(200).json(students);
  }))
// <--  ***  /api/student/ ***  POST --> 
  .post(handleAsync(async (req, res) => {
    // Creating a new student document in the student collection
    const newStudent = await Student.create({
      NAME: req.body.NAME,
      DOB: req.body.DOB,
      ADDRESS: req.body.ADDRESS,
      STD: req.body.STD,
      DOA: req.body.DOA,
      TAGS: req.body.TAGS
    });
    res.status(200).json(newStudent);
  }));

router.route("/:id")
// <--  ***  /api/student/:id ***  GET --> 
  .get(handleAsync(async (req, res) => {
    // Fetching an individual student document from the student collection by ID
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: `Cannot find Student with ID ${id}` });
    res.status(200).json(student);
  }))
  // <--  ***  /api/student/:id ***  PUT --> 
  .put(handleAsync(async (req, res) => {
    // Updating an existing student document in the student collection by ID
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body);
    if (!updatedStudent) return res.status(404).json({ message: `Cannot find Student with ID ${id}` });
    const updatedData = await Student.findById(id);
    res.status(200).json(updatedData);
  }))
  // <--  ***  /api/student/:id ***  DELETE --> 
  .delete(handleAsync(async (req, res) => {
    // Deleting a student document from the student collection by ID
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) return res.status(404).json({ message: `Cannot find Student with ID ${id}` });
    res.status(200).json({ message: `Student with ID ${id} has been deleted` });
  }));

module.exports = router;
