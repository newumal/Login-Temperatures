const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/UserModel')

const protect = asyncHandler( async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try {
          // get token from header
          token = req.headers.authorization.split(' ')[1];

          //verify the token
          const decode = jwt.verify(token, 'abc1');

          //get user from token
          req.user = await User.findById(decode.id).select('-password')
          next()
      }catch (e) {
          console.log(e)
          res.status(401)
          throw new Error('Not Authorized ')
      }
  }

  if (!token){
      res.status(401)
      throw new Error('Not authorized , no token')
  }

})

module.exports = {protect}