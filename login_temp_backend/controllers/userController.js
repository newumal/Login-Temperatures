const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/UserModel');

/*
 @desc register user
 @route POST api/users
 @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name , email, password } = req.body;
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all fields ')
    }

    // check if user is already exists
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('user already exits !')
    }

    //hash password
    // const salt = await bcrypt.getSalt(10)
   const hashedPassword = await bcrypt.hashSync(password, 10)

    // create user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser){
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid data !')
    }
    res.status(200).json({ message: 'Register User '})
})


/*
 @desc Authenticate user login
 @route POST api/users/login
 @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //check for user email
    const user = await User.findOne({ email })

    //&& (await bcrypt.compare(password, user.password))
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
  res.status(200).json({ message: 'user logged'})
})

// Generate JWT Tokens
const generateToken = (id) => {
    return jwt.sign({id}, 'abc1' ,{
        expiresIn: '30d'
    })
}

/*
 @desc get registered user
 @route GET api/users/me
 @access Public
 */
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
}