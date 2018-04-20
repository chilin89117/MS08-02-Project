const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Message.find()
         .populate({path: 'user', select: ['_id', 'fname']})
         .exec()
         .then((msgs) => {
           res.status(200).send({status: 'Messages retrieved.', obj: msgs});
         })
         .catch((err) => res.status(500).send({status: 'GET: error', message: 'Unable to retrieve messages.'}));
});

// Protect all routes below this middleware using JWT
router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if(err) return res.status(401).send({status: 'Unauthorized.', message: 'Not logged in!'});
    next();
  });
});

router.post('/', async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.query.token);
    let user = await User.findById(decoded.user._id);
    let msg = new Message({content: req.body.content, user});
    let saveMsg = await msg.save();
    user.messages.push(saveMsg._id);
    let saveUsr = await user.save();
    res.status(200).send({status: 'Message saved & user updated.', obj: saveMsg});
  } catch(err) {
    res.status(500).send({status: 'POST: error', message: 'Unable to save message.'});
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.query.token);
    let msg = await Message.findById(req.params.id);
    if(msg.user != decoded.user._id) return res.status(401).send({
      status: 'PATCH: error', message: 'Not authorized to edit message.'});
    msg.content = req.body.content;
    let updatedMsg = await msg.save();
    // let updatedMsg = await Message.findByIdAndUpdate(req.params.id, {$set: {content: req.body.content}}, {new: true});
    res.status(200).send({status: 'Message updated.', obj: updatedMsg});
  } catch(err) {
    res.status(500).send({status: 'PATCH: error', message: 'Unable to edit message.'});
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.query.token);
    let msg = await Message.findById(req.params.id);
    if(msg.user != decoded.user._id) return res.status(401).send({
      status: 'DELETE: error', message: 'Not authorized to delete message.'});
    await msg.remove();
    let userUpd = await User.findByIdAndUpdate(
      msg.user, {$pull: {messages: {$in: [msg._id]}}}
    );
    res.status(200).send({status: 'Message deleted.'});
  } catch(err) {
    res.status(500).send({status: 'DELETE: error', message: 'Unable to delete message.'});
  }
});

module.exports = router;