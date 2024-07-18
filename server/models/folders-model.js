const mongoose = require('mongoose')

const foldersSchema = new mongoose.Schema({
  foldername: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rootFolderId: {
    type: Number,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
})

const Folder = mongoose.model('Folder', foldersSchema)

module.exports = Folder
