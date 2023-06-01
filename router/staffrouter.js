const express = require("express");
const Staff = require("../schema/staff");
const { handleAsync } = require('../middleware/error/error');
let router = express.Router();

router.use(express.json());


router.route("/")
  // <--  ***  /api/staff/ ***  GET --> 
  .get(handleAsync(async (req, res) => {
    // Fetching all staff documents from the staff collection
    const allStaff = await Staff.find({})
      .populate("typeOfStaff", "-createdAt -updatedAt -_id -__v")
      .select("-__v");
    res.status(200).json(allStaff);
  }));

router.route("/:staffCategory")
  // <--  ***  /api/staff/:staffCategory ***  POST --> 
  .post(handleAsync(async (req, res) => {
    // Creating a new staff document in the staff collection
    const newStaff = await Staff.create({
      name: req.body.name,
      typeofstaff: req.params.staffCategory,
      phonenumber: req.body.phoneNumber,
      gender: req.body.gender
    });
    const populatedStaff = await newStaff
      .populate("typeOfStaff", "-createdAt -updatedAt -_id -__v")
      .select("-__v");
    res.status(200).json(populatedStaff);
  }));

router.route("/:id")
  // <--  ***  /api/staff/:id ***  GET --> 
  .get(handleAsync(async (req, res) => {
    // Fetching an individual staff document by ID from the staff collection
    const { id } = req.params;
    const staff = await Staff.findById(id)
      .populate("typeOfStaff", "-createdAt -updatedAt -_id -__v")
      .select("-__v");
    res.status(200).json(staff);
  }))
  // <--  ***  /api/staff/:id ***  PUT --> 
  .put(handleAsync(async (req, res) => {
    // Updating an existing staff document by ID in the staff collection
    const { id } = req.params;
    const staffToUpdate = await Staff.findByIdAndUpdate(id, req.body);
    if (!staffToUpdate) return res.status(404).json({ message: `Cannot find Staff with ID ${id}` });
    const updatedStaff = await Staff.findById(id)
      .populate("typeOfStaff", "-createdAt -updatedAt -_id -__v")
      .select("-__v");
    res.status(200).json(updatedStaff);
  }))

  // <--  ***  /api/staff/:id ***  DELETE --> 
  .delete(handleAsync(async (req, res) => {
    // Deleting a staff document by ID from the staff collection
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id, req.body);
    if (!deletedStaff) return res.status(404).json({ message: `Cannot find Staff with ID ${id}` });
    res.status(200).json({ message: `Staff with ID ${id} has been deleted` });
  }));

module.exports = router;
