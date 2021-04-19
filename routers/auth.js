const asyncHandler = require('express-async-handler');
const randomToken = require('random-token');
const User = require('../app/models/user');
const bcrypt = require('bcrypt');
const db = require('../app/models/db');
const emailController = require('../services/email');
const express = require('express');
const router = express.Router();


router.use(function(req, res, next) {
    res.locals.title = 'Đăng nhập';
    next();
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', asyncHandler(async function(req, res) {
    const { username, password } = req.body;
    const found = await User.findByUsername(username)
    if (found && bcrypt.compareSync(password, found.password)) {
        req.session.userId = found.id;
        res.locals.title = 'Trang chủ';
        res.redirect('../');

    } else {
        res.render('/auth/login');
    }
}));

router.get('/logout', function(req, res) {
    delete req.session.userId;
    res.redirect('/');
})

router.get('/register', function(req, res) {
    res.locals.title = 'Đăng ký';
    res.render('auth/register');
});

router.post('/register', async function(req, res) {
    const { username, email, password, displayName, confirmpassword } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    User.findOne({
            where: {
                username
            },
        }).then((user) => {
            if (!user) {
                var token = randomToken(16);
                User.create({
                        username,
                        displayName,
                        email,
                        password: hash,
                        active: token,
                    })
                    .then((user) => {
                        const activeURL = `http://localhost:3000/auth/active?username=${user.username}&token=${token}`;
                        emailController.sendMail(user.email, 'Kích hoạt tài khoản đăng nhập ✔', 'Click vào đường link để kích hoạt tài khoản ' + activeURL, activeURL)
                        res.render("auth/login");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                let msg = "Đăng kí không thành công";
                res.render("auth/register", { msg });
            }
        })
        .catch((error) => {
            res.send(error);
            console.log(error);
        });
});

router.get('/active', function(req, res) {
    let data = req.query;
    User.findOne({
        where: {
            username: data.username,
            active: data.token
        }
    }).then((user) => {
        if (user) {
            User.update({
                active: true,
            }, {
                where: {
                    username: user.username,
                },
            }).then(() => {
                let msg = "Kích hoạt tài khoản thành công";
                res.locals.title = "Kích hoạt tài khoản";
                res.render('auth/active', { msg });

            }).catch((error) => {
                console.error(error);
            })
        } else {
            let msg = "Kích hoạt tài khoản thất bại";
            res.locals.title = "Kích hoạt tài khoản";
            res.render('auth/active', { msg });
        }
    })
})

router.get('/profile', (req, res) => {
    res.locals.title = "Trang cá nhân";
    res.render('user/profile');
})
module.exports = router;