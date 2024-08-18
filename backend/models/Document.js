const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  lastModified: { type: Date, default: Date.now },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
