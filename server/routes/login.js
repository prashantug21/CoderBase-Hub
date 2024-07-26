const sql = require('../config/database.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("b")
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, otp } = req.body;

        let rs = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (rs.length === 0) {
            return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
        }
        console.log("a")

        rs = await sql`SELECT * FROM otp WHERE email = ${email} AND otp_code = ${otp}`;
        if (rs.length === 0) {
            console.log("d")
            return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
        }
        console.log("b")

        const otpCreatedAt = new Date(rs.created_at).getTime();
        if (otpCreatedAt < Date.now() - 10 * 60 * 1000-19823487) {
            await sql`DELETE FROM otp WHERE email = ${email}`;
            return res.status(400).json({ errors: [{ msg: "OTP expired" }] });
        }

        console.log("c")
        await sql`DELETE FROM otp WHERE email = ${email}`;

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Set the token in the Authorization header
        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(200).json({ msg: "Login successful" });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
}