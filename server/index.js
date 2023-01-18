const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// Connect to database & setup data model
mongoose.set('strictQuery', true);
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`-------Listening on port ${process.env.PORT}-------`);
  } catch (err) {
    console.error(`Mongo Connect Error: ${err}`);
  }
})();

const todoSchema = mongoose.Schema({
  name: String,
  description: String,
  createdDate: Date,
  isComplete: Boolean,
});

const todo = mongoose.model('todo', todoSchema);

// Initialize express server
const app = express();
app.listen(process.env.PORT);
app.use(express.json());

app.get('/', async (req, res) => {
  const response = await todo.find();
  res.send(JSON.stringify(response));
});

app.post('/', async (req, res) => {
  const newTodo = await new todo(req.body);
  newTodo.save();
  res.send(newTodo);
});

app.put('/:todoId', async (req, res) => {
  try {
    await todo.findOneAndUpdate({ _id: req.params.todoId }, { ...req.body });
  } catch (err) {
    res.send(`Update Error: ${err}`);
  }
  res.send('Update Sucess');
});

app.delete('/:todoId', async (req, res) => {
  try {
    await todo.findOneAndDelete({ _id: req.params.todoId });
  } catch (err) {
    res.send(`Delete error: ${err}`);
  }
  res.send('Delete Success');
});
