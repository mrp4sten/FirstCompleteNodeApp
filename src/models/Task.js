const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = mongoose.model(
  "Task",
  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: {type: Date, default: Date.now}
  })
);

module.exports = TaskSchema;
