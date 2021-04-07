// store notes in object title and content 
// store objects in arrays
// sit down look at activity first server figure out whats going on
//later in activities they use express thats what we want to use for our hw 
// activities star wars / every activity builds on the previous ones

//objects that store notes in should come from a class/constructor

// look at starr wars 3 activity 10  line 43 line 44 setting multipul end points at once making character a parameter 

//app.get("/api/notes/:notes", (req, res) => {
 //   const chosen = req.params.notes;
//});


// add a 3rd value thats id 1 2 3 4 

//make a server get any response back from it 
// start the server node server.js
const express = require('express');

const path = require('path');

const app = express();

var fs = require('fs')



const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true}));

app.use(express.json());

// html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.get('/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, '/public/css/styles.css')));

app.get('/js/index.js', (req,res) => res.sendFile(path.join(__dirname, '/public/js/index.js')));

app.post('/api/notes', (req, res) => {
    
    const saveNote = req.body;
    const rawNotes = fs.readFileSync(path.join(__dirname, 'db/db.json'));
    const notes = JSON.parse(rawNotes);
    saveNote.id = notes.length + 1;
    notes.push(saveNote);
    const newNotes = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), newNotes);
    res.send(saveNote);
  
});

app.delete(`/api/notes/:id`, (req, res) => { 

    const id = req.params.id;
    const deleteNote = fs.readFileSync(path.join(__dirname, 'db/db.json'));
    const remove = JSON.parse(deleteNote);


    for (i = 0; i < remove.length; i++) {
      if (id == remove[i].id) {
          remove.splice(i, 1);
      }
    }

    for (i = 0; i < remove.length; i++) {
        remove[i].id = i + 1;
    }
    const newNotes = JSON.stringify(remove);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), newNotes);
    res.send(remove);
});


// open file push to array thenwrite over original file again
app.listen(PORT, () => {
    console.log(`App listnening on PORT: ${PORT}`)
});
