// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
  },
  client: {
    type: String, // You can adjust the type based on your requirements (e.g., String, Object, etc.)
    // required: true,
  },
  languages: {
    type: [String], // Assuming you want to store an array of languages
    // required: true,
  },
  projectLink: {
    type: String, // Adjust the type based on the type of link you're storing
  },
  demoLink: {
    type: String, // Adjust the type based on the type of link you're storing
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
