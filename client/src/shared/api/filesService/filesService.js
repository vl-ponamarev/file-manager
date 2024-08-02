import api from '../../http/index'

export default class FilesService {
  static async getLimitFiles(limit, offset) {
    try {
      const response = await api.get('/posts', limit, offset)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getFolders() {
    try {
      const response = await api.get('/get-folders')
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getFiles() {
    try {
      const response = await api.get('/get-files')
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async createFolder(folderData) {
    try {
      const response = await api.post('/create-folder', folderData)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async saveFiles(formData) {
    try {
      const response = await api.post('/save-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async editName(data, formData) {
    const { id, type } = data
    console.log(id)

    console.log(data)

    try {
      let response
      if (type === 'folder') {
        response = await api.put(`/edit-folder/${id}`, { formData })
        console.log(response)
      }
      if (type === 'file') {
        response = await api.put(`/edit-file/${id}`, { formData })
        console.log(response)
      }
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async deleteFiles(fileIds) {
    try {
      console.log(fileIds)
      const response = await api.delete('/delete-files', {
        data: fileIds,
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  static async deleteFolders(foldersIds) {
    try {
      console.log(foldersIds)
      const response = await api.delete('/delete-folders', {
        data: foldersIds,
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
