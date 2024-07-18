const sql = require('../config/database.js');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, userid, name, otp_code } = req.body;

    try {
        // Check if user ID already exists
        let rs = await sql`select * from users where user_id = ${userid}`;
        if (rs.length > 0) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        // Check if email already exists
        rs = await sql`select * from users where email = ${email}`;
        if (rs.length > 0) {
            return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
        }

        // Check if OTP is valid
        rs = await sql`select * from otp where user_id = ${userid} and email = ${email} and otp_code = ${otp_code}`;
        if (rs.length === 0) {
            return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
        }

        // Check if OTP has expired
        const otpCreatedAt = rs[0].created_at;
        console.log(otpCreatedAt)
        console.log(new Date(Date.now())-otpCreatedAt)
        // console.log(otpCreatedAt<new Date(Date.now() - 10 * 60 * 1000-19357728));
        if (otpCreatedAt < new Date(Date.now() - 10 * 60 * 1000-19823487)) { // 10 minutes expiry
            // await sql`delete from otp where user_id = ${userid} and email = ${email}`;
            return res.status(400).json({ errors: [{ msg: "OTP expired" }] });
        }

        // Delete OTP after validation
        await sql`delete from otp where user_id = ${userid} and email = ${email}`;

        // Insert new user
        await sql`insert into users (user_id, email, user_name) values (${userid}, ${email}, ${name})`;

        // Generate JWT token
        const token = jwt.sign({ userid: userid, email: email }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({ msg: "User created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
};
