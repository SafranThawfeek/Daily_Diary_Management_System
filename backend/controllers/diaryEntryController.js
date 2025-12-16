const DiaryEntry = require('../models/diaryEntryModel');

exports.createEntry = async (req, res) => {
  try {
    const { date, title, description, mood } = req.body;
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized - no user ID' });
    if (!date || !title) return res.status(400).json({ message: 'date and title required' });
    const entry = new DiaryEntry({ userId, date: new Date(date), title, description, mood });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('Create entry error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const q = { userId: req.userId };
    const entries = await DiaryEntry.find(q).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error('Get entries error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findOne({ _id: req.params.id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    console.error('Get entry error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { date, title, description, mood } = req.body;
    const update = {};
    if (date) update.date = new Date(date);
    if (title) update.title = title;
    if (description !== undefined) update.description = description;
    if (mood !== undefined) update.mood = mood;

    const entry = await DiaryEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: update },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    console.error('Update entry error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await DiaryEntry.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error('Delete entry error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entries = await DiaryEntry.find({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow }
    }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    console.error('Get today entries error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
