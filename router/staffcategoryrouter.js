const express = require("express");
const StaffCategory = require("../schema/staffcategory");
const { handleAsync } = require('../middleware/error/error');
const router = express.Router();

router.use(express.json());

router.route("/")
  // <--  ***  /api/staffcategory/ ***  GET --> 
.get(handleAsync(async (req, res) => {
    // Fetching all staff category documents from the staff_category collection
    const allStaffCategories = await StaffCategory.find({});
    res.status(200).json(allStaffCategories);
}))
  // <--  ***  /api/staffcategory/ ***  POST --> 
.post(handleAsync(async (req, res) => {
    // Creating a new staff category document in the staff_category collection
    const newStaffCategory = await StaffCategory.create({
      category: req.body.category
    });
    res.status(200).json(newStaffCategory);
}));

router.route("/:id")
  // <--  ***  /api/staffcategory/:id ***  GET --> 
.get(handleAsync(async (req, res) => {
    // Fetching an individual staff category document with ID from the staff_category collection
    const { id } = req.params;
    const staffCategory = await StaffCategory.findById(id);
    res.status(200).json(staffCategory);
}))
  // <--  ***  /api/staffcategory/:id ***  PUT --> 
.put(handleAsync(async (req, res) => {
    // Updating an existing staff category document in the staff_category collection by ID
    const { id } = req.params;
    const staffCategoryToUpdate = await StaffCategory.findByIdAndUpdate(id, req.body);
    if (!staffCategoryToUpdate)  return res.status(404).json({ message: `Cannot find Staff category with ID ${id}` });
    const updatedStaffCategory = await StaffCategory.findById(id);
    res.status(200).json(updatedStaffCategory);
}))
  // <--  ***  /api/staffcategory/:id ***  DELETE --> 
.delete(handleAsync(async (req, res) => {
    // Deleting a staff category document from the staff_category collection by ID
    const { id } = req.params;
    const deletedStaffCategory = await StaffCategory.findByIdAndDelete(id);
    if (!deletedStaffCategory)  return res.status(404).json({ message: `Cannot find Staff category with ID ${id}` });
    res.status(200).json({ message: `Staff category with ID ${id} has been deleted` });
}));

module.exports = router;
