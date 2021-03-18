const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const { a, b } = req.query;
    const c = Number(a) + Number(b);
    res.render('index', { a, b, c });
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