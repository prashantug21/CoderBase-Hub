const sql=require('../config/database.js');
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const dotnev=require('dotenv').config();


module.exports=async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, userid, name,otp_code } = req.body;

    let rs = sql`select * from users where user_id=${userid} and email=${email}`;
    if (rs.length == 0) {
        return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
    }
    rs = sql`select * from otp where user_id=${userid} and email=${email} and otp_code=${otp_code}`;
    if (rs.length == 0) {
        return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
    }
    if (rs[0].created_at < Date.now() - 10*60*1000) {
        sql`delete from otp where user_id=${userid} and email=${email}`;
        return res.status(400).json({ errors: [{ msg: "OTP expired" }] });
    }
    sql`delete from otp where user_id=${userid} and email=${email}`;
    const token = jwt.sign({ userid: userid, email: email }, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ msg: "Login successful" });
}