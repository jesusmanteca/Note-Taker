const express = require('express')
const fs = require('fs');
const path = require('path');
//require the data in order to create a route
const { notes } = require('./db/db');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const PORT = process.env.PORT || 3002;
//instantiates the server so that we can later chain on methods to the Express.js server
const app = express();
// parse incoming string or array data

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// parse incoming JSON data
app.use(express.json());
// middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint
app.use(express.static('public'));






// method to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});