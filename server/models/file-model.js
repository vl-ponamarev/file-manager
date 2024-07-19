const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
})

const File = mongoose.model('File', fileSchema)

module.exports = File
