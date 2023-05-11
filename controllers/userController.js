const asyncHandler = require('express-async-handler')
const User = require('../model/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const userRegister = asyncHandler(async(req, res) =>{

    const {username, email, password } = req.body;

    if(!(username && email && password)){
        res.status(400);
        throw new Error('Please fill in all fields');
    };

    let existedUser = await User.findOne({email})

    if(existedUser){
        res.json({
            msg: 'user already exist.'
        })
    }

    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    let newUser = await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    const token = await jwt.sign({
        user_id: newUser._id,
        email
        }, process.env.JWT_SECRET,
        {
            expiresIn:'2h'
        })

        req.cookies = token
        newUser.token = token
    

        res.redirect('/welcome.html')

});



const userLogin = asyncHandler(async(req, res) =>{
    
    const {email, password} = req.body
    
    if(!(email  && password)){
        res.status(400)
        throw new Error('Fill all fields ')
    }

    const checkUser = await User.findOne({email})

    if(checkUser && (await bcrypt.compare(password, checkUser.password))){
        const token = jwt.sign({
            user_id: checkUser._id,
            email
        },
        process.env.JWT_SECRET
        ,
        {
            expiresIn: '2h'
        })

        res.cookie('jwt', token)

        res.redirect('/info')
    }else{
        res.json({
            msg: 'Invalid incredentials'
        })
    }
});



const getInfo = (req, res)=>{

    res.json({
        info: req.user
    })
}

const getData = (req, res)=>{

    res.json({
        info: req.user
    })
}

module.exports = {
    userRegister,
    userLogin,
    getInfo,
    getData
}