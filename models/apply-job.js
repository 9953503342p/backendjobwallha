const mongoose = require('mongoose');

// Define the schema for questions and answers, including video upload details
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }, // answer is required
  video: {
    upload: {
      uuid: String,
      progress: Number,
      total: Number,
      bytesSent: Number,
      filename: String,
      chunked: Boolean,
      totalChunkCount: Number,
    },
    path: { type: String, required: true },
    previewElement: Object,
    previewTemplate: Object,
    accepted: Boolean,
    processing: Boolean,
    xhr: Object,
  },
});

// Define the schema for ApplyJob
const ApplyjobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'candidatesignup', required: true },
    JobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poste', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String, required: true },
    questionsAndAnswers: [questionSchema],
    resume: { type: String, required: false }, // Optional resume field
    approved: {
      type: String,
      enum: ['pending', 'approved', 'rejected'], // Allowed values
      default: 'pending', // Default value
    },
  },
  { timestamps: true }
);

// Ensure at least one of 'answer' or 'video' is provided for each question
ApplyjobSchema.path('questionsAndAnswers').validate(function (value) {
  for (let i = 0; i < value.length; i++) {
    const qAndA = value[i];
    if (!(qAndA.answer || (qAndA.video && qAndA.video.path))) {
      return false; // Validation fails if neither answer nor video (with path) is provided
    }
  }
  return true; // Validation passes if all questions meet the condition
}, 'Each question must have either an answer or a video with a valid path.');

const Apply = mongoose.model('Apply', ApplyjobSchema);

module.exports = Apply;