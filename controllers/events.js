const express = require('express');
const Event = require('../models/event');
const isSignedIn = require('../middleware/is-signed-in');
const requireRole = require('../middleware/require-role');

const router = express.Router();

// GET /events - Display all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .populate('createdBy', 'username')
      .sort({ date: 1 });
    
    res.render('events/index.ejs', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

// GET /events/new - Show form to create new event (admin only)
router.get('/new', isSignedIn, requireRole('admin'), (req, res) => {
  res.render('events/new.ejs');
});

// POST /events - Create new event (admin only)
router.post('/', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.session.user._id,
      currentParticipants: 0,
    };

    const newEvent = await Event.create(eventData);
    res.redirect('/events');
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
});

// GET /events/:id - Show specific event details
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'username');
    
    if (!event) {
      return res.status(404).send('Event not found');
    }
    
    res.render('events/show.ejs', { event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).send('Error fetching event');
  }
});

// GET /events/:id/edit - Show form to edit event (admin only)
router.get('/:id/edit', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).send('Event not found');
    }
    
    res.render('events/edit.ejs', { event });
  } catch (error) {
    console.error('Error fetching event for edit:', error);
    res.status(500).send('Error fetching event');
  }
});

// PUT /events/:id - Update event (admin only)
router.put('/:id', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).send('Event not found');
    }
    
    res.redirect(`/events/${req.params.id}`);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Error updating event');
  }
});

// DELETE /events/:id - Delete event (admin only)
router.delete('/:id', isSignedIn, requireRole('admin'), async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).send('Event not found');
    }
    
    res.redirect('/events');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Error deleting event');
  }
});

module.exports = router;
