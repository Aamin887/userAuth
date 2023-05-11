const jwt = require('jsonwebtoken');
const asyncHandler =require('express-async-handler')

const verifyUser = asyncHandler(async(req, res, next) => {

    let token

    if(req.cookies.jwt){
        try {
            token = req.cookies.jwt

            let decoded = await jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Uauthorised user')
        }
    }else{
        res.status(400)
        throw new Error('Invalid token')
    }

});

module.exports = verifyUser