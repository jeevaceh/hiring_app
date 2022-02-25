const db = require("../model");
const regist = db.regist;
const Token = db.token
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        
//finding the email
        const user = await regist.findOne({where:{ email: req.body.email }});
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
//finding the user id
        let token = await Token.findOne({subQuery: false,where:{id: user.id }});
        if (!token) {
            token = await Token.create({
               id: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            await token.save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${token.id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:id/:token", async (req, res) => {
    try {
       
        const user = await regist.findByPk(req.params.id);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({ where:{
           id: user.id,
            token: req.params.token,
        
        }});
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.destroy();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;