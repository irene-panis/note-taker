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

// handle receiving of new note and saving it to db
app.post('api/notes', (req, res) => {
  // save req title and text into variables and trim whitespace
  const title = req.body.title.trim();
  const text = req.body.text.trim();

  if (!title || !text) { // handles empty inputs
    console.error("Title or text cannot be empty.");
  } else {
    // new note created
    const note = {
      title: title,
      text: text,
      id: generateId()
    }
    // read db file so we can turn it into an array to have items pushed to
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const jsonArray = JSON.parse(data);
      jsonArray.push(note);

      // turn array back into json so we can rewrite db file
      const newDb = JSON.stringify(jsonArray);

      fs.writeFile('./db/db.json', newDb, 'utf-8', (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log('New note successfully added.');
        }
      })
    });
  }
});

// fallback path for paths that dont exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`);
});