const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
  originalname: {
    type: String,
    required: true,
  },
})

const File = mongoose.model('File', fileSchema)

module.exports = File
