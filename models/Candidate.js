const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  Username: {
    type: String,
    // required: true,
    unique: true
  },
  Email: {
    type: String,
    // required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
  },
  Password: {
    type: String,
    required: true, 
  },
  Phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  Name: {
    type: String,
  },
  Website: {
    type: String,
  },
  Qualification: {
    type: String,
  },
  Language: {
    type: [String],
  },
  Jobcategory: {
    type: String,
  },
  Experience: {
    type: String,
  },
  Currentsalery: {
    type: String,
  },
  Expectedsalery: {
    type: String,
  },
  Age: {
    type: String,
  },
  Country: {
    type: String,
  },
  City: {
    type: String,
  },
  Postcode: {
    type: String,
  },
  Fulladdress: {
    type: String,
  },
  Description: {
    type: String,
  },
  Profileimage: {
    type: String,
  },
  Facebook: {
    type: String,
  },
  Twitter: {
    type: String,
  },
  Linkdin: {
    type: String,
  },
  Whatsapp: {
    type: String,
  },
  Instagram: {
    type: String,
  },
  Pinterest: {
    type: String,
  },
  Tumbir: {
    type: String,
  },
  Youtube: {
    type: String,
  }
});

// Export the Model
const candidatesignup = mongoose.model('candidatesignup', candidateSchema);

module.exports = candidatesignup;
