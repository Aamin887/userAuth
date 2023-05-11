const express = require('express')
const verifyUser = require('../middleware/auth')

const {userRegister, userLogin, getInfo, getData} = require('../controllers/userController');

const router = express.Router()

router.post('/login', userLogin).post('/register', userRegister).get('/info', verifyUser, getInfo).get('/data', verifyUser,getData)




module.exports = router;