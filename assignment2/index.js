const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const sendEmail = require('./nodemailer/app');

mongoose.connect('mongodb://localhost/assignment2')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/',(req,res)=>{
    res.render('register');
})

app.post('/register', (req,res)=>{
    const{username,password} = req.body;
    bcrypt.hash(password,12,(err,hash)=>{
        if(err) return res.render('register');
        const user = new User({
            username,
            password:hash
        });
        sendEmail(username);
        user.save((err)=>{
            if(err) return res.render('register');
            res.redirect('/login');
        });
    });
})

app.get('/login',(req,res)=>{
    res.send('Message has been sent to your email');
})
