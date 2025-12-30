const mongoose = require('mongoose');

// Define the schema for Employment Data
const employmentSchema = new mongoose.Schema({
    designation: { type: String, },
    organization: { type: String, },
    currentCompany: { type: String,},
    startDate: { type: String },
    endDate: { type: String },
    jobDescription: { type: String },
}, { _id: false }); 

// Define the schema for Education Data
const educationSchema = new mongoose.Schema({
   
    educationCategory: {
        type: String,
    },
    course: {
        type: String,  
    },
    university: {
        type: String, 
    },
    startyear:{
        type:String,  
    },
    lastyear:{
        type:String,  
    }
  
}, { _id: false });

const ItskillSchema = new mongoose.Schema({
   
    Skills: {
        type: String,
       
  
    },
    Version: {
        type: String,
     
    },
    lastused: {
        type: String,
   
    },
    Experienceyear:{
        type:String,
        
    },
    Month:{
        type:String,
       
    }
  
}, { _id: false });

const AddprojectSchema= new mongoose.Schema({
    Projecttitle:{type:String},
    Education:{type:String},
    Client:{type:String},
    Projectstatus:{type:String},
    Startworking:{type:String},
    endwork:{type:String},
    Detailofproject:{type:String}
},{  _id: false })

const CareerSchema = new mongoose.Schema({
    Industry: { type: String },
    Department: { type: String },
    Role: { type: String },
    Jobtype: { type: String },
    Employmentype: { type: String },
    Preferredshift: { type: String },
    AvailabilitytoJoin: { type: String },
    ExpectedSalary: {
        MoneyType: { type: String },
        money: { type: String }
       
    },
    DesiredLocation: { type: String },
    DesiredIndustry: { type: String },
}, { _id: false });

const PersonalDetailSchema= new mongoose.Schema({
    dob:{type:String},
    gender:{type:String},
    permanentAddress:{type:String},
    hometown:{type:String},
    pincode:{Type:String},
    maritalStatus:{type:String},
    passportNumber:{type:String},
    assistance:{type:String},
    workPermitCountry:{type:String},
},{  _id: false })





// Define the schema for ResumeHeadline
const resumeHeadlineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'candidatesignup', required: true ,unique:true },
    headline: { type: String, default: '' },
    KeySkills: { type: [String], default: [] },
    resumefile: { type: String, },
    employment:{ type: [employmentSchema], default: [] },
    education: { type: [educationSchema], default: [] },  
    Itskill:  {type:[ItskillSchema],default:[]},
    Addproject:  {type:[AddprojectSchema],default:[]},
    Career: { type: CareerSchema },
    PersonalDetail:{type:PersonalDetailSchema},
    ProfileSummary: { type: String, default: '' },

}, { timestamps: true });


// Create the Resume model
const Resume = mongoose.model('Resume', resumeHeadlineSchema);

module.exports = Resume;
