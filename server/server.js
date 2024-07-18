const express = require('express');
const router = express.Router();
const port = 5000;
const app = express();
const sendOTP=require('./routes/sendOTP.js');
const sql=require('./config/database.js');
const signup=require('./routes/signup.js');
const login=require('./routes/login.js');
const profile=require('./routes/profile.js');
const edit=require('./routes/edit.js');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('./component/tokenverfication.js');

app.use(express.json())

router.get('/', (req, res) => {
    // console.log("Hello World");
    res.json({hello:"Hello World"});
});

router.post("/login",body('email').isEmail().withMessage('Please enter a valid email'),body('userid').isAlphanumeric().withMessage('Username must be alphanumeric').isLength({ min: 4, max: 20 }).withMessage('Username must be at least 4 characters long and no more than 20 characters long'),body('name').isLength({ min: 4, max: 30 }).withMessage('Name must be at least 4 characters long and no more than 30 characters long') ,login);

router.post("/signup",body('email').isEmail().withMessage('Please enter a valid email'),body('userid').isAlphanumeric().withMessage('Username must be alphanumeric').isLength({ min: 4, max: 20 }).withMessage('Username must be at least 4 characters long and no more than 20 characters long'),body('name').isLength({ min: 4, max: 30 }).withMessage('Name must be at least 4 characters long and no more than 30 characters long'),signup);

router.get("/profile",authenticateToken,body('userid').isAlphanumeric().withMessage('Username must be alphanumeric').isLength({ min: 4, max: 20 }).withMessage('Username must be at least 4 characters long and no more than 20 characters long'),profile);

router.post("/sendOTP",body('email').isEmail().withMessage('Please enter a valid email'),body('userid').isAlphanumeric().withMessage('Username must be alphanumeric').isLength({ min: 4, max: 20 }).withMessage('Username must be at least 4 characters long and no more than 20 characters long'),body('name').isLength({ min: 4, max: 30 }).withMessage('Name must be at least 4 characters long and no more than 30 characters long'),sendOTP);

router.put("/edit",authenticateToken,body('userid').isAlphanumeric().withMessage('Username must be alphanumeric').isLength({ min: 4, max: 20 }).withMessage('Username must be at least 4 characters long and no more than 20 characters long'),edit);

app.use('/', router);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    // const rs = await sql`select * from otp`;
    // console.log(rs);
});
