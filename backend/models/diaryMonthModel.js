// models/diaryMonthModel.js
const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  brief: { type: String, default: '' }
}, { _id: false });

const WeekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  days: { type: [DaySchema], default: [] },
  detailsNotes: { type: String, default: '' },
  traineeSignatureUrl: { type: String, default: '' }, 
  officerRemarks: { type: String, default: '' }
}, { _id: false });

const DiaryMonthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: Number, required: true }, // 1..12
  year: { type: Number, required: true },
  header: {
    name: String,
    address: String,
    phone: String,
    category: String,
    fieldOfTraining: String,
    registrationNumber: String,
    trainingEstablishments: [{ name: String, from: Date, to: Date }],
    trainingLocation: String,
    periodFrom: Date,
    periodTo: Date
  },
  weeks: { type: [WeekSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.models.DiaryMonth || mongoose.model('DiaryMonth', DiaryMonthSchema);
