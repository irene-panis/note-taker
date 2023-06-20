const express = require('express');
const path = require('path');
const fs = require('fs');
import { v4 as generateId } from 'uuid'; // package for generating note ids

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// get notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// retrieve notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (response) => {
    res.json(JSON.parse(response));
  });
});

// fallback path for paths that dont exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`);
});