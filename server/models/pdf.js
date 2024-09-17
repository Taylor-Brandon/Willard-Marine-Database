const { Schema, model } = require('mongoose');

const pdfSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  ship : {
    type: String,
    required: true
  }
});

const Pdf = model('Pdf', pdfSchema);

module.exports = Pdf;