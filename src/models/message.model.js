const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
    minlength: 3
  },
  distance: {
    type: Number,
    required: true,
    unique: false,
    trim: false,
    minlength: 1
  },
  message: {
    type: [String],
    unique: false,
    trim: false,
    minlength: 1
  }
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;