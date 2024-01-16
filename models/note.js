
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const password = "eDWj7N41VT6veTnq";
const url = process.env.MONGODB_URI;
console.log("connecting to the database");
mongoose.connect(url)
.then(result => {
    console.log("connected t mongodb");
})
.catch((error) => {
    console.log("error:", error.message);
});

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5, 
      required: true
    }, 
    important: Boolean 
 });

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  });

module.exports = mongoose.model('Note', noteSchema)
