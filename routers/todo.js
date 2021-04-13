const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Todo = require('../app/models/todo');


router.get('/', function(req, res) {
    if (req.session.userId) {
        Todo.findAll({})
            .then(todo => {
                todo = JSON.parse(JSON.stringify(todo));
                res.locals.title = "Danh sách việc cần làm"
                res.render('todo', { toDoList: todo });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.redirect('auth/login');
    }
});



router.post('/', function(req, res) {
    const { name, done } = req.body;
    Todo.create({ name, done })
        .then(todo => {
            res.redirect('/todo');
        })
        .catch(console.error);
})

module.exports = router;