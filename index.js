const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieSession = require('cookie-session');

const db = require('./app/models/db');

const authMiddleware = require('./app/middlewares/auth');
const userRouter = require('./routers/user');
const sumRouter = require('./routers/sum');
const authRouter = require('./routers/auth');
const todoRouter = require('./routers/todo');
const bcript = require('bcrypt');




const app = express();
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'serect'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(authMiddleware);

// expressLayouts setting
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use('/user', userRouter);
app.use('/sum', sumRouter);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);
app.get('/', (req, res) => {
    res.locals.title = 'Trang chủ';
    res.render('index')
});



// const bcrypt = require('bcrypt');
// const hash = bcrypt.hashSync('kocopass', 10);
// console.log(hash);


db.sync().then(function() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));;
}).catch(console.error);