const otp=require('../component/otp.js')
const { body, validationResult } = require('express-validator');

module.exports=async(req,res)=>{
    const{userid}=req.body
    const {email}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const otps=await otp(email,userid)
    // console.log(otps)
    if(otps==="success"){
        return res.status(200).json({ msg: "OTP sent successfully" });
    }
    else{
        return res.status(400).json({ errors: [{ msg: otps }] });
    }
}
