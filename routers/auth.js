const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.use(function(req, res, next) {
    res.locals.title = 'Đăng nhập';
    next();
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', function(req, res) {
    const { username, password } = req.body;
    const found = User.findByUsername(username);
    if (found && bcrypt.compareSync(password, found.password)) {
        req.session.userId = found.id;
        res.redirect('/');
    } else {
        res.render('auth/login');
    }
});

router.get('/logout', function(req, res) {
    delete req.session.userId;
    res.redirect('/');
})

module.exports = router;