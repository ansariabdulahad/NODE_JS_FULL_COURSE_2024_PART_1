const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

const products = [
    {
        id: 1,
        name: "product 1"
    },
    {
        id: 2,
        name: "product 2"
    },
    {
        id: 3,
        name: "product 3"
    }
];

app.get('/', (req, res) => {
    res.render('home', { title: "Home Page!", products });
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About Page!" });
})

app.listen(5000, (err) => {
    if (err) throw err;
    console.log(`listening on 5000`);
});