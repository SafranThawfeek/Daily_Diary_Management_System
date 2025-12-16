// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctl = require('../controllers/diaryMonthController');
const entryCtl = require('../controllers/diaryEntryController');

router.use(auth);

// Today's Details endpoint - get diary entries for today
router.get('/today', entryCtl.getToday);

// single-entry endpoints (used by the legacy frontend Add/Edit pages)
router.post('/', entryCtl.createEntry);
router.get('/', entryCtl.getEntries);

router.post('/months', ctl.createMonth);
router.get('/months', ctl.getMonths);
router.get('/months/:id', ctl.getMonth);
router.put('/months/:id', ctl.updateMonth);
router.put('/months/:id/week/:w/day/:d', ctl.updateDayBrief);
router.delete('/months/:id', ctl.deleteMonth);

// single-entry detail endpoints (placed after /months to avoid route conflicts)
router.get('/:id', entryCtl.getEntry);
router.put('/:id', entryCtl.updateEntry);
router.delete('/:id', entryCtl.deleteEntry);

module.exports = router;
