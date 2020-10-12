const router = require('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

// add the GET routes
// lets you see notes json
router.get('/notes', (req, res) => {
    // let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let results = notes;
    res.json(results);
});
//lets you search notes by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
// add POST routes
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('Your note is not properly formatted. You gotta write a note... to have a note.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports  = router;