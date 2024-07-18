const {Resend}=require('resend')
const dotenv = require('dotenv').config();
const sql=require('../config/database.js');
const resend = new Resend(process.env.EMAIL_API_KEY);


function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    return otp.toString(); // Convert number to string
}

// Function to send OTP via email
async function otp(email,userid) {
    try {
        const otp = generateOTP(); // Generate OTP
        const message = `Your OTP is: ${otp}`; 
        await resend.emails.send({
            from: 'CodebaseHub <codebasehub@resend.dev>',
            to: email,
            subject: 'OTP Verification',
            text: message
        });
        // check if otp already exists
        // console.log("user3id",userid);
        const rs = await sql`select * from otp where user_id=${userid}`;
        if (rs.length > 0) {
            // console.log(1)
            await sql`update otp set otp_code=${otp} where user_id=${userid}`;
            return "success";
        } 
        await sql`insert into otp (user_id,email,otp_code) values (${userid},${email},${otp})`;
        console.log(`OTP sent to ${email}`);
        return "success"; 
    } catch (error) {
        console.error('Error sending OTP:', error);
        return error;
    }
}

module.exports =  otp ;