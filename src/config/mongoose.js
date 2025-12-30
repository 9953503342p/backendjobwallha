const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PostCourses = require('../models/PostCourses'); // Ensure the PostCourses model is imported
const upload7 = require('../middleware/upload'); // Ensure the upload middleware is imported

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
};

mongoose.connect(process.env.MONGODB_URI, options)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/post-course', upload7.single('courseimage'), async (req, res) => {
    try {
        // Check for admin authentication
        const adminId = req.cookies.adminid;
        if (!adminId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access. Admin not logged in.' });
        }

        // Extract fields from req.body
        const { coursetitle, courseprice, courseduration, coursedescription, notplaceprice, placementprice, course_concept } = req.body;

        // Validate required fields
        if (!coursetitle || !courseprice || !courseduration || !coursedescription || !notplaceprice || !placementprice || !course_concept) {
            return res.status(400).json({ success: false, message: 'All fields are required, including course concepts.' });
        }

        // Ensure course_concept is an array (if received as a string, split by commas)
        const conceptsArray = Array.isArray(course_concept) ? course_concept : course_concept.split(',');

        // Validate image upload
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Course image is required.' });
        }

        // Format image path properly
        const courseimage = req.file.path.replace(/\\/g, '/'); // Convert to forward slashes for URL compatibility

        // Create a new course document
        const newCourse = new PostCourses({
            coursetitle,
            courseprice,
            courseduration,
            coursedescription,
            notplaceprice,
            placementprice,
            course_concept: conceptsArray,
            courseimage
        });

        // Save to database
        await newCourse.save();

        res.status(201).json({ success: true, message: 'Course posted successfully!', course: newCourse });
    } catch (error) {
        console.error('Error posting course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

app.get('/get-courses', async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await PostCourses.find();

        // If no courses found
        if (!courses || courses.length === 0) {
            return res.status(404).json({ success: false, message: 'No courses found.' });
        }

        // Send response
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Add a PUT method to edit a course
app.put('/edit-course/:id', upload7.single('courseimage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { coursetitle, courseprice, courseduration, coursedescription, notplaceprice, placementprice, course_concept } = req.body;

        // Validate required fields
        if (!coursetitle || !courseprice || !courseduration || !coursedescription || !notplaceprice || !placementprice || !course_concept) {
            return res.status(400).json({ success: false, message: 'All fields are required, including course concepts.' });
        }

        // Ensure course_concept is an array (if received as a string, split by commas)
        const conceptsArray = Array.isArray(course_concept) ? course_concept : course_concept.split(',');

        // Validate image upload
        let courseimage = req.body.courseimage;
        if (req.file) {
            courseimage = req.file.path.replace(/\\/g, '/'); // Convert to forward slashes for URL compatibility
        }

        // Update the course document
        const updatedCourse = await PostCourses.findByIdAndUpdate(id, {
            coursetitle,
            courseprice,
            courseduration,
            coursedescription,
            notplaceprice,
            placementprice,
            course_concept: conceptsArray,
            courseimage
        }, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        res.status(200).json({ success: true, message: 'Course updated successfully!', course: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Add a DELETE method to delete a course
app.delete('/delete-course/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the course document
        const deletedCourse = await PostCourses.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        res.status(200).json({ success: true, message: 'Course deleted successfully!' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

module.exports = mongoose;