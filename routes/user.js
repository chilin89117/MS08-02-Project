const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/', (req, res, next) => {
  let user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  user.save()
      .then((result) => res.status(200).send({status: 'User registered.', obj: result}))
      .catch((err) => res.status(500).send({status: 'POST: error', message: 'Unable to create new user.'}));
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email})
      .then((user) => {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).send({status: 'Unauthorized.', message: 'Credentials not found.'});
        } else {
          let token = jwt.sign({user}, 'secret', {expiresIn: 7200});
          return res.status(200).send({status: 'User logged in.', obj: {token, userId: user._id}});
        }
      })
      .catch((err) => res.status(500).send({status: 'POST: error', message: 'Unable to log in user.'}));
});

module.exports = router;