const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  subscribers: [{ type: String }],
});

module.exports = mongoose.model('Topic', schema);
