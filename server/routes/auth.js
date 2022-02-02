const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { secretkey  } = require('../config/config');
const User = require('../models/User');

const validate = [
    check('fullname')
        .isLength({min: 6})
        .withMessage('Fullname should have 6 or more characters'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({min: 4})
        .withMessage('Password must be at least 4 characters')
]

const loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({min: 4})
        .withMessage('Password must be at least 4 characters')
]

const generateToken = user => {
    return jwt.sign({
        _id: user._id, 
        email: user.email, 
        fullname: user.fullname
    }, secretkey)    
}

router.post('/register', validate, async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const userExist = await User.findOne({email: req.body.email});
    if (userExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt )

    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        
        // create and assign a token
        const token = generateToken(user);
        
        res.header('x-auth-token', token).send({
            message: 'User registered successfully', 
            data: {
                id: savedUser._id, 
                fullname: savedUser.fullname,
                email: savedUser.email,
                // *** for test reasons ***
                // password: savedUser.password
            }, token})
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', loginValidation, async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    // check if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(404).send('User is not registered')

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(404).send('Invalid Email or Password')

    // create and assign a token
    const token = generateToken(user)
    res.header('x-auth-token', token).send({
        message: 'Logged in successfully', 
        data: {
            id: user._id, 
            fullname: user.fullname,
            email: user.email
        }, token})
})

module.exports = router;