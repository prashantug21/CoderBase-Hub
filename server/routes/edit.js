const sql=require('../config/database.js');
const { body, validationResult } = require('express-validator');

module.exports=async(req,res)=>{
    console.log(req.body)
    const leetcode_handle=req.body.leetcode_handle;
    const codechef_handle=req.body.codechef_handle;
    const codeforces_handle=req.body.codeforces_handle;
    const gfg_handle=req.body.gfg_handle;
    const userid=req.body.userid;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }

    await sql`UPDATE users SET leetcode_handle = ${leetcode_handle}, codechef_handle = ${codechef_handle}, codeforces_handle = ${codeforces_handle}, gfg_handle = ${gfg_handle} WHERE user_id = ${userid}`;

    return res.status(200).json({ msg: "Profile updated successfully" });
}