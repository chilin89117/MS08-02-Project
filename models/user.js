const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

