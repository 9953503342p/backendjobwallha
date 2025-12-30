const mongoose = require('mongoose');

// Define the schema for ResumeHeadline
const PostjobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp', required: true },
    jobtitle: { type: String, required: true },
    jobcategory: { type: String, required: true },
    jobtype: { type: String, required: true },
    offeredsalary: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
  
    email: { type: String, required: true },
    website: { type: String, required: true },
    estsince: { type: String, required: true },
    completeaddress: { type: String, required: true },
    description: { type: String, required: true },
    Requirements:{type:String,required:true},
    Responsibilities:{type:String,required:true},
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    Vacnices: { type: String, required: true },
    question: { type: [String], required: true },
}, { timestamps: true });

// Add TTL index on 'endDate'
PostjobSchema.index({ endDate: 1 }, { expireAfterSeconds: 0 });

const Postjob = mongoose.model('Poste', PostjobSchema);

module.exports = Postjob;
