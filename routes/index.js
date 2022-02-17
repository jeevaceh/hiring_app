const express = require('express');
const router = express.Router();
const db = require("../model");
const User = db.User;
const Candidate=db.Candidate;
//post
router.post('/job-detail', (req, res) => {
  const data = {
    profile: req.body.profile,
    location: req.body.location,
    jobtype: req.body.jobtype,
    about: req.body.about
  };
  // Save job in the database
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

router.post('/candidate', (req, res) => {
  const data = {
    can_name: req.body.can_name,
    can_location: req.body.can_location,
    can_jobtype: req.body.can_jobtype,
    can_about: req.body.can_about
  };
  // Save User in the database
  Candidate.create(data)
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