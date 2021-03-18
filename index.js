const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const sumRouter = require('./routers/sum');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/user', userRouter);
app.use('/sum', sumRouter);

app.get('/', (req, res) => {
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



app.listen(port, () => console.log(`Example app listening on port ${port}!`));;