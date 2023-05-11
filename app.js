const express = require('express');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const port = process.env.PORT;

const connectDB = require('./config/database');

const app = express();


connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', '/views')

app.use(require('./middleware/errorHandler'))
app.use('/', require('./routes/userRoute'));

app.get('views/', (req, res)=>{
    res.render('public/success')
})

app.use(express.static(__dirname + 'public'))


app.listen(port, () =>{
    console.log(`server is live at ${port}`)
});