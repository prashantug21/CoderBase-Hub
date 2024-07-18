const sql = require('../config/database.js');
const leetcode = require('../component/profiles/leetcode.js');
const codechef = require('../component/profiles/codechef.js');
const codeforces = require('../component/profiles/codeforce.js');
const gfg = require('../component/profiles/gfg.js');

const profile = async (req, res) => {
    const userid = req.body.userid;

    try {
        const result = await sql`SELECT * FROM users WHERE user_id = ${userid}`;

        if (result.length > 0) {
            const data = result[0];
            const responseData = {};

            if (data.leetcode_handle != null) {
                responseData.leetdata = await leetcode(data.leetcode_handle);
            }
            if (data.codechef_handle != null) {
                responseData.codechefdata = await codechef(data.codechef_handle);
            }
            if (data.codeforces_handle != null) {
                responseData.codeforcesdata = await codeforces(data.codeforces_handle);
            }
            if (data.gfg_handle != null) {
                responseData.gfgdata = await gfg(data.gfg_handle);
            }

            res.status(200).json(responseData);
        } else {
            res.status(400).json({ msg: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = profile;
