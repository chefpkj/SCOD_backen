import express from 'express';
import mongoose from 'mongoose';
import paragraphRoutes from './routes/paragraph.js'// Correct the import path
const app = express();
app.use(express.json());
// import Paragraph from './models/paragraph.js';

// mongoose
//   .connect("mongodb+srv://chefpkj:DyqcksLJodalBbO8@cluster0.t7iphou.mongodb.net/?retryWrites=true&w=majority")
//   .then(() => console.log("Connected to the database..."))
//   .catch((err) => console.error(err, 'Error'));

mongoose
  .connect("mongodb://localhost:27017/SCOD")
  .then(() => console.log("Connected to the database..."))
  .catch((err) => console.error(err, 'Erro'));


  
app.use("/paragraph", paragraphRoutes);

app.listen(3014, () => {
  console.log('Listening on port 3014...');
});
