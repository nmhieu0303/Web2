const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('sum/form');
});

router.post('/', function(req, res) {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const result = num1 + num2;
    res.render('sum/result', { num1, num2, result });
});


module.exports = router;