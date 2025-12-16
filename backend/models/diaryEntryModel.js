const mongoose = require('mongoose');

const DiaryEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  mood: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.DiaryEntry || mongoose.model('DiaryEntry', DiaryEntrySchema);
