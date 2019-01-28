const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');     
        }
    });
    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));


// function for year
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


// function for text
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


// control home
app.get("/home", (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'TOFU',
        welcome: 'try it'
    });
});


// control about
app.get("/about", (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'RADISH',
    });
});


// control bad
app.get("/bad", (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


// connect to web-server localhost:3000
app.listen(3000, () => {
    console.log('Server is up on port 3000');
    
});
