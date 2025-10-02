const express = require('express');
const isSignedIn = require('../middleware/is-signed-in');
const requireRole = require('../middleware/require-role');
const User = require('../models/user');
const Event = require('../models/event');

const router = express.Router();

// GET /users/me - Show my profile
router.get('/me', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).send('User not found');
    res.render('users/profile.ejs', { userProfile: user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading profile');
  }
});

// GET /users/me/edit - Edit my profile form
router.get('/me/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.status(404).send('User not found');
    res.render('users/edit.ejs', { userProfile: user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit form');
  }
});

// PUT /users/me - Update my profile
router.put('/me', isSignedIn, async (req, res) => {
  try {
    const allowed = ['fullName', 'bio', 'belt', 'age', 'weightKg'];
    const update = {};
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }

    await User.findByIdAndUpdate(req.session.user._id, update, { runValidators: true });
    res.redirect('/users/me');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating profile');
  }
});

module.exports = router;

// GET /users/me/bookings - List my booked events
router.get('/me/bookings', isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const events = await Event.find({ participants: userId })
      .sort({ date: 1 })
      .exec();
    res.render('users/bookings.ejs', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading your bookings');
  }
});


// ADMIN: List all users
router.get('/', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}).sort({ username: 1 }).lean();
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading users');
  }
});

// ADMIN: Show any user's profile
router.get('/:id', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.render('users/show.ejs', { userProfile: user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading user');
  }
});


