const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const msgSchema = new Schema({
  content: {type: String, maxlength: 300, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Message', msgSchema);
