if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');


const db = require("./db/queries");


const initializePassport = require("./passport-config");
initializePassport(passport);

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


app.get('/', async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render('index', { messages });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading messages");
    }
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, req.body.email, hashedPassword);
        res.redirect('/login');
    } catch (err) {
        console.error("Registration error:", err);
        res.redirect('/register');
    }
});


app.get('/new', ensureAuthenticated, (req, res) => {
    res.render('form');
});


app.post('/new', ensureAuthenticated, async (req, res) => {
    try {
        await db.createMessage(req.body.text, req.user.id);
        res.redirect('/');
    } catch (err) {
        console.error("Error posting message:", err);
        res.redirect('/new');
    }
});


app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Mini Message Board running on port http://localhost:${PORT}`);
});