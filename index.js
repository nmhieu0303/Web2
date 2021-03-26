const express = require('express');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/auth');
const userRouter = require('./routers/user');
const sumRouter = require('./routers/sum');
const authRouter = require('./routers/auth');
const bcript = require('bcrypt');

const expressLayouts = require('express-ejs-layouts');
const cookieSession = require('cookie-session');


const app = express();
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'serect'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(authMiddleware);

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/user', userRouter);
app.use('/sum', sumRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.locals.title = 'Trang chủ';
    res.render('index')
});

app.get('/hello', function(req, res) {
    const name = req.query.name;
    res.send(`Hello query ${name}`);
});

app.get('/hello/:name', function(req, res) {
    const name = req.params.name;
    res.send(`Hello param ${name}`);
});

// app.get('/view', function(req, res, next) {
//     req.session.view = (req.session.view || 0) + 1;
//     res.end(req.session.view, 'views');
// })

app.get('/view', function(req, res) {
    // Update views
    req.session.views = (req.session.views || 0) + 1

    // Write response
    res.send(`Bạn đã xem trang này ${req.session.views} lần`);
})

// const bcrypt = require('bcrypt');
// const hash = bcrypt.hashSync('kocopass', 10);
// console.log(hash);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));;