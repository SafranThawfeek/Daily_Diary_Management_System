// controllers/diaryMonthController.js
const DiaryMonth = require('../models/diaryMonthModel');

// helper to build month weeks (Monday-first)
function buildMonthWeeks(year, month) {
  const weeks = [];
  const first = new Date(year, month - 1, 1);
  let curr = new Date(first);
  const dayOfWeek = curr.getDay(); // 0 Sunday ... 6 Saturday
  // compute Monday-first start
  const mondayOffset = (dayOfWeek === 0) ? -6 : (1 - dayOfWeek);
  curr.setDate(curr.getDate() + mondayOffset);

  for (let w = 1; w <= 6; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      days.push({ date: new Date(curr), brief: '' });
      curr.setDate(curr.getDate() + 1);
    }
    weeks.push({ weekNumber: w, days, detailsNotes: '' });
  }
  return weeks;
}

exports.createMonth = async (req, res) => {
  try {
    const { year, month, header } = req.body;
    const userId = req.userId;
    if (!year || !month) return res.status(400).json({ message: 'year and month required' });
    const existing = await DiaryMonth.findOne({ userId, year, month });
    if (existing) return res.status(400).json({ message: 'Month already exists' });
    const weeks = buildMonthWeeks(year, month);
    const doc = new DiaryMonth({ userId, year, month, header, weeks });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error('Create month error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMonths = async (req, res) => {
  try {
    const { year } = req.query;
    const q = { userId: req.userId };
    if (year) q.year = Number(year);
    const months = await DiaryMonth.find(q).sort({ year: -1, month: -1 });
    res.json(months);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMonth = async (req, res) => {
  try {
    const doc = await DiaryMonth.findOne({ _id: req.params.id, userId: req.userId });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMonth = async (req, res) => {
  try {
    const doc = await DiaryMonth.findOne({ _id: req.params.id, userId: req.userId });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    const { header, weekNumber, detailsNotes } = req.body;
    if (header) doc.header = header;
    if (weekNumber && typeof detailsNotes !== 'undefined') {
      const wk = doc.weeks.find(w => w.weekNumber === Number(weekNumber));
      if (wk) wk.detailsNotes = detailsNotes;
    }
    doc.updatedAt = new Date();
    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateDayBrief = async (req, res) => {
  try {
    const { id, w, d } = req.params; // w=weekNumber, d=dayIndex 0..6
    const doc = await DiaryMonth.findOne({ _id: id, userId: req.userId });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    const week = doc.weeks.find(x => x.weekNumber === Number(w));
    if (!week) return res.status(404).json({ message: 'week not found' });
    week.days[Number(d)].brief = req.body.brief || '';
    doc.updatedAt = new Date();
    await doc.save();
    res.json({ message: 'updated', week });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMonth = async (req, res) => {
  try {
    await DiaryMonth.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
