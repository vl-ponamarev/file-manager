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

  static async editFileName(id, formData) {
    try {
      const response = await api.put(`/files/${id}`, formData, {
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

  static async deleteFile(data) {
    try {
      const response = await api.delete('/delete', {
        data: JSON.stringify({ _id: data }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
