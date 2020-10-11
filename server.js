const express = require('express')
const fs = require('fs');
const path = require('path');
//require the data in order to create a route
const { notes } = require('./db/db');


const PORT = process.env.PORT || 3001;
//instantiates the server so that we can later chain on methods to the Express.js server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }

// add the GET routes
app.get('/api/notes', (req, res) => {
    // res.send('<h1>Hello!</h1>');
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
  });



// method to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});