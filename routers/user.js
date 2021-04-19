const { promisify } = require('util');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const rename = promisify(require('fs').rename);
const uploadImage = require('../app/controllers/upload')
const asyncHandler = require('express-async-handler');
var upload = multer({ dest: './uploads/' })

router.get('/login', function(req, res) {
    res.send('User login page');
});

router.get('/profile', (req, res) => {
    res.locals.title = "Trang cá nhân";
    res.render('user/profile');
})

router.post('/profile', upload.single('avatar'), asyncHandler(async function(req, res, next) {
    await rename(req.file.path, `./public/assets/images/profiles/${req.currentUser.id}.jpg`);
    console.log(req.file);
    res.redirect('/user/profile');
}));
module.exports = router;