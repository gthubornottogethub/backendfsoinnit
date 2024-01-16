
                                                //initlization
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");

                                                //middleware 

const logger = (req, res, next) => {
   console.log("method:", req.method);
   console.log("path:", req.path);
   console.log("body:", req.body);
   console.log("ay 5edma ya rayes");
   next();
}

const errorHandler = (error, req, res, next) => {
   console.error(error.message);
   if (error.name === "CastError"){
      return res.status(400).send({error: "this id is in a wrong format bruh"});
   } else if (error.name === "Validation error"){
      return res.status(400).send({error: error.message})
   }
   next(error);
}

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
 }

app.use(cors()); 
app.use(express.json());
app.use(logger);
app.use(express.static('dist'));

                                               //handling requests 

app.get('/', (req, res) => {
   res.send("<h1> ayo wsg bruh <h1>");
});

app.get('/api/notes', (req, res)=> {
   Note.find({}).then(notes =>{
      res.json(notes);
   })
});

app.post("/api/notes", (req, res, next) => {
   const body = req.body;
   console.log(body);
   if(body.content === undefined){
      return res.status(400).json({error:"there must be content bruv"});
   };
   const note= new Note({
      content: body.content,
      important: body.important || false,
     // id: generateId(),
   });
   note.save().then(savedNote => {
      res.json(savedNote);
   }).catch(err => next(err));
});


app.get('/api/notes/:id', (req, res, next) => {
   Note.findById(req.params.id).then(note => {
      if (note) {
         res.json(note);
      } else {
         res.status(404).end();
      }
   }).catch(err => next (err))
}); 

app.delete("/api/notes/:id", (req, res, next)=>{
   Note.findByIdAndDelete(req.params.id)
   .then(result => {
      res.status(204).end();
   })
   .catch(error => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
   const {content, important} = req.body; 
   Note.findByIdAndUpdate(req.params.id, {content, important}, {new: true, runValidators: true, context:'query'})
   .then(updatedNote => {
      res.json(updatedNote)
   }).catch(error => next(error));
})

                                                //handling errors 

app.use(unknownEndpoint);
app.use(errorHandler);

                                               //tash8eel el server 

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
   console.log(`the server is running on port ${PORT}`);
});










/* const generateId = () => {
      const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
      return maxId + 1;
   }; */