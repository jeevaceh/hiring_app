const express = require('express');
const router = express.Router();
const db = require("../model");
const User = db.User;
const Candidate = db.Candidate;
const multer = require('multer')
const path = require('path')

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdf')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

router.post('/candidate',
  //using multer for file upload,
  multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|pdf/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, true)
      }
      cb('Give proper files formate to upload')
    }
  }).single('can_pdf'),



  (req, res) => {
    const data = {
      can_name: req.body.can_name,
      can_location: req.body.can_location,
      can_jobtype: req.body.can_jobtype,
      can_pdf: req.file.path,
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