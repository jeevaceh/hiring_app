const express = require('express');
const router = express.Router();
const db = require("../model");
const User = db.User;
const Candidate = db.Candidate;
const multer = require('multer')
const path = require('path')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const regist = db.regist;
dotenv.config();



//register page
router.post('/register', async(req, res, next)=>{
  //res.status(201).json(req.body);
  //add new user and return 201
  const salt = await bcrypt.genSalt(10);
  var usr = {
    name : req.body.name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, salt)
  };
  created_user = await regist.create(usr);
  res.status(201).json(created_user);
});

//log in page

router.post('/login',async(req,res,next)=>{
  const user = await regist.findOne({ where : {email : req.body.email }});
  if(user){
     const password_valid = await bcrypt.compare(req.body.password,user.password);
     if(password_valid){
         token = jwt.sign({ "id" : user.id,"email" : user.email,"name":user.name },process.env.SECRET);
         res.status(200).json({ token : token });
     } else {
       res.status(400).json({ error : "Password Incorrect" });
     }
   
   }else{
     res.status(404).json({ error : "User does not exist" });
   }
   
   });

//verify token
   router.get('/verify',
 async(req,res,next)=>{
  try {
    let token = req.headers['authorization'].split(" ")[1];
    let decoded = jwt.verify(token,process.env.SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(401).json({"msg":"Couldnt Authenticate"});
  }
  },
  async(req,res,next)=>{
    let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
    if(user === null){
      res.status(404).json({'msg':"User not found"});
    }
    res.status(200).json(user);
 }); 


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