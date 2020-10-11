const express = require('express')
const fs = require('fs');
const path = require('path');
//require the data in order to create a route
const { notes } = require('./db/db');


const PORT = process.env.PORT || 3002;
//instantiates the server so that we can later chain on methods to the Express.js server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// function to search by id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }
//function to create a new note json
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      );

    return note;
  }
// function to validate the data entry
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

// add the GET routes
// lets you see notes json
app.get('/api/notes', (req, res) => {
    // res.send('<h1>Hello!</h1>');
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
});
//lets you search notes by id
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
  });


// add POST routes
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('Your note is not properly formatted. You gotta write a note... to have a note.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});






// method to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});