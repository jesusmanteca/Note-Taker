const express = require('express')
const fs = require('fs');
const path = require('path');
//require the data in order to create a route
const { db } = require('./db/db');


const PORT = process.env.PORT || 3001;
//instantiates the server so that we can later chain on methods to the Express.js server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// add the GET routes
app.get('/api/notes', (req, res) => {
    // res.send('<h1>Hello!</h1>');
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
});


// method to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});