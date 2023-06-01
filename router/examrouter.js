const express = require("express");
const StudentCourse = require("../schema/exam");
const { handleAsync } = require('../middleware/error/error');
const router = express.Router();

router.use(express.json());

router.route("/")
  // <--  ***  /api/exam/ ***  GET --> 
.get(handleAsync(async (req, res) => {
    // Fetching all exam documents from the student_course collection
    const allExams = await StudentCourse.find({})
        .populate('studentId courseId', "-createdAt -updatedAt -_id -__v")
        .select("-createdAt -updatedAt -__v");
    res.status(200).json(allExams);
}));

  // <--  ***  /api/exam/:studentId/:courseId ***  POST --> 
router.post("/:studentId/:courseId", handleAsync(async (req, res) => {
    // Creating a new exam document in the student_course collection
    const { studentId, courseId } = req.params;
    const newExam = await StudentCourse.create({
        courseId: [courseId],
        studentId: [studentId],
        dateOfExam: req.body.dateOfExam,
        dateOfResult: req.body.dateOfResult,
        result: req.body.result,
        grade: req.body.grade
    });

    const createdExam = await newExam.populate("studentId courseId", "-createdAt -updatedAt -_id -__v");
    res.status(200).json(createdExam);
}));

router.route("/:id")
  // <--  ***  /api/exam/:id ***  GET --> 
.get(handleAsync(async (req, res) => {
    // Fetching an individual exam document from the student_course collection by ID
    const { id } = req.params;
    const exam = await StudentCourse.findById(id)
        .populate('studentId courseId', "-createdAt -updatedAt -_id -__v")
        .select("-createdAt -updatedAt -__v");
    res.status(200).json(exam);
}))
  // <--  ***  /api/exam/:id ***  PUT --> 
.put(handleAsync(async (req, res) => {
    // Updating an existing exam document in the student_course collection by ID
    const { id } = req.params;
    const examToUpdate = await StudentCourse.findByIdAndUpdate(id, req.body);
    if (!examToUpdate)  return res.status(404).json({ message: `Cannot find Exam with ID ${id}` });
    const updatedExam = await StudentCourse.findById(id)
        .populate('studentId courseId', "-createdAt -updatedAt -_id -__v")
        .select("-__v");
    res.status(200).json(updatedExam);
}))
  // <--  ***  /api/exam/:id ***  DELETE --> 
.delete(handleAsync(async (req, res) => {
    // Deleting an exam document from the student_course collection by ID
    const { id } = req.params;
    const deletedExam = await StudentCourse.findByIdAndDelete(id);
    if (!deletedExam)  return res.status(404).json({ message:  `Cannot find Exam with ID ${id}` });
    res.status(200).json({ message: `Exam with ID ${id} has been deleted` });
}));

module.exports = router;
