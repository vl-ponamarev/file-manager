const mongoose = require('mongoose')

const filesStoreSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  rootFolderId: {
    type: Number,
    required: true,
  },
})

const FilesStore = mongoose.model('FilesStore', filesStoreSchema)

module.exports = FilesStore
