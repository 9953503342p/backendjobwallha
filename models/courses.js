const mongoose = require('mongoose');

// Define the schema for PostCourses
const postCourseSchema = new mongoose.Schema({
    coursetitle: { type: String, required: true },
    courseprice: { type: String, required: true },
    courseduration: { type: String, required: true },
    courseimage: { type: String, required: true },
    coursedescription: { type: String, required: true },
    notplaceprice: { type: String, required: true },
    placementprice: { type: String, required: true },
    course_concept: { type: [String], required: true }
});

// Create the model
const PostCourses = mongoose.model('Courses', postCourseSchema);

module.exports = PostCourses;
