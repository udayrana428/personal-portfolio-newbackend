// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
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
    images: {
      type: [String], // Array of image URLs
      // required: true,
      default: [],
    },
    category: {
      type: String,
    },
    client: {
      type: String,
    },
    technologies: {
      type: [String],
    },
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    status: {
      type: String,
      default: "unpublished",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
