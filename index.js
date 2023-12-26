
const express = require("express");
const cors = require("cors");
const app = express();
//middleware
const logger = (req, res, next) => {
   console.log("method:", req.method);
   console.log("path:", req.path);
   console.log("body:", req.body);
   console.log("ay 5edma ya rayes");
   next();
}
app.use(express.json());
app.use(cors());
app.use(logger);

let notes = [
   {
     "content": "leao",
     "important": false,
     "id": 1
   },
   {
     "content": "adli",
     "important": true,
     "id": 2
   },
   {
     "content": "krunic",
     "important": false,
     "id": 3
   },
   {
     "content": "theo",
     "important": true,
     "id": 4
   },
   {
     "content": "kjaer",
     "important": false,
     "id": 5
   },
   {
     "content": "giroud",
     "important": false,
     "id": 6
   },
   {
     "content": "rejinders",
     "important": false,
     "id": 7
   }
 ]

const generateId = () => {
      const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
      return maxId + 1;
   };


app.get('/', (req, res) => {
   res.send("<h1> ayo wsg bruh <h1>");
});

app.get('/api/notes', (req, res)=> {
   res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
   const id = req.params.id;
   const note = notes.find( note => note.id.toString() === id); //tala3 li el note elly el id bta3ha howa elly fel url
   if (!note){
      res.statusMessage = "note doesnt exist lil bro";
      res.status(404).end();}
   res.json(note); }); 

app.delete("/api/notes/:id", (req, res)=>{
   const id = Number(req.params.id);
   const note = notes.find(note => note.id === id);
   response.status(204).end();
});

app.post("/api/notes", (req, res) => {
   const body = req.body;
   if(!body.content){
      return res.status(400).json({error:"there must be content bruv"});
   };
   const note= {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
   }
   notes = notes.concat(note);
   res.json(note);
});

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
 }
 
 app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001; 
app.listen(PORT, ()=>{
   console.log(`the server is running on port ${PORT}`);
});










