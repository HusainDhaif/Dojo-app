const express = require('express');
const Player = require('../models/player');
const isSignedIn = require('../middleware/is-signed-in');
const requireRole = require('../middleware/require-role');

const router = express.Router();

// List players with basic stats (admin only)
router.get('/', isSignedIn, requireRole(['admin']), async (req, res) => {
  try {
    const players = await Player.find({}).sort({ name: 1 });
    res.render('players/index.ejs', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching players');
  }
});

// Show single player stats (admin only)
router.get('/:id', isSignedIn, requireRole(['admin']), async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).send('Player not found');
    res.render('players/show.ejs', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching player');
  }
});

module.exports = router;


