const mongoose = require('mongoose')

const password = "eDWj7N41VT6veTnq";
const url = `mongodb+srv://discordtemp15:${password}@cluster0.1tmf4ne.mongodb.net/noteApp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String, 
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
const notes = [
    {
        content: "leao",
        important: false,
    },
    {
        content: "krunic",
        important: false,
    },
    {
        content: "theo",
        important: true,
    },
    {
        content: "kjaer",
        important: false,
    },
    {
        content: "giroud",
        important: false,
    },
    {
        content: "rejinders",
        important: false,
    }
];
const noteInstances = notes.map(noteData => new Note(noteData));
Note.insertMany(noteInstances);
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

