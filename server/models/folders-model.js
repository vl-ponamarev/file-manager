const mongoose = require('mongoose')

const foldersSchema = new mongoose.Schema({
  foldername: {
    type: String,
    required: true,
  },
  rootFolderId: {
    type: String,
    default: 'null',
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  // files: {
  //   type: [String],
  //   required: true,
  // },
})

const Folder = mongoose.model('Folder', foldersSchema)

module.exports = Folder
