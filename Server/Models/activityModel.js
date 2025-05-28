const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  activityName: {
    type: String,
    required: true,
  },
  activityPhoto: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Parent',
    required: false, // 👈 Not required anymore
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Activity', activitySchema);
