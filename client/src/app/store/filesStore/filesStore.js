import { makeAutoObservable } from 'mobx'
import FilesService from 'shared/api/filesService/filesService'

export default class FilesStore {
  files = []

  constructor() {
    makeAutoObservable(this)
  }

  setFiles(files) {
    this.files = files
  }

  async getFiles() {
    try {
      const response = await FilesService.getFiles()
      this.setFiles(response.data.reverse())
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  async saveFiles(formData) {
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }
    try {
      const response = await FilesService.saveFiles(formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteFile(data) {
    try {
      const response = await FilesService.deleteFile(data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async editFileName(id, formData) {
    try {
      const response = await FilesService.editFileName(id, formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}
