const mongoose = require('mongoose');

const EmployorSchema = new mongoose.Schema({
  username: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,

    
  },
  password: {
    type: String,
    
  
  },
  phone: {
    type: String,
  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  companylogo: {
    type: String,
  },
  backgroundbannerlogo: {
    type: String,
  },
  companyName: {
    type: String,
  },

  Website: {
    type: String,
  },
  Estsince: {
    type: String,
  },
  TeamSize: {
    type: String,
  },
  description: {
    type: String, // Added type for description field
  },
  gallery:{
    type:[String]
  },
  Address: {
    type: String,
  },
  about: {
    type: String,
  },



  videoGalleryData: {
    youtubeLinks: { type: [String], default: [] },   // Array of YouTube video links
    vimeoLinks: { type: [String], default: [] },     // Array of Vimeo video links
    customVideo: { type: String, default: '' } // Single custom video link or file path
  },
  socialLinks: {
    Facebook: { type: String },
    Twitter: { type: String },
    Linkedin: { type: String },
    Whatsapp: { type: String },
    Instagram: { type: String },
    Pinterest: { type: String },
    Tumblr: { type: String },
    Youtube: { type: String },
  }

});

const Employorsignup = mongoose.model('Emp', EmployorSchema);

module.exports = Employorsignup;
