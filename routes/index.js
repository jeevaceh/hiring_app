const express = require('express');
const router = express.Router();
const db = require("../model");
const User = db.User;
//post
router.post('/job-detail', (req, res) => {
  const data = {
    profile: req.body.profile,
    location: req.body.location,
    jobtype: req.body.jobtype,
    about: req.body.about
  };
  // Save User in the database
  User.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user"
      });
    });
})
module.exports = router;