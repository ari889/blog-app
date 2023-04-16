const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  isSaved: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = mongoose.model("Post", postSchema);
