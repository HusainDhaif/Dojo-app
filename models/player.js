const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  belt: { type: String, enum: ['white', 'yellow', 'green', 'blue', 'red', 'black'], default: 'white' },
  weightKg: { type: Number, min: 0 },
  age: { type: Number, min: 0 },
  wins: { type: Number, default: 0, min: 0 },
  losses: { type: Number, default: 0, min: 0 },
  draws: { type: Number, default: 0, min: 0 },
  trainingsAttended: { type: Number, default: 0, min: 0 },
  submissions: { type: Number, default: 0, min: 0 },
  takedowns: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

playerSchema.virtual('fights').get(function() {
  return this.wins + this.losses + this.draws;
});

playerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;


