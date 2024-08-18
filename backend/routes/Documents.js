const express = require('express');
const Document = require('../models/Document');
const router = express.Router();

router.post('/documents', async (req, res) => {
  const { title, content } = req.body;
  const newDocument = new Document({ title, content });
  await newDocument.save();
  res.status(201).json(newDocument);
});

router.get('/documents/:id', async (req, res) => {
  const document = await Document.findById(req.params.id);
  res.json(document);
});

router.put('/documents/:id', async (req, res) => {
  const { content } = req.body;
  const document = await Document.findByIdAndUpdate(
    req.params.id,
    { content, lastModified: Date.now() },
    { new: true }
  );
  res.json(document);
});

router.delete('/documents/:id', async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
