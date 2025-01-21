import api from '../../http/index'

export default class FilesService {
  static async getLimitFiles(limit, offset) {
    try {
      const response = await api.get('/posts', limit, offset);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getFolders() {
    try {
      const response = await api.get('/get-folders');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getFiles() {
    try {
      const response = await api.get('/get-files');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async createFolder(folderData) {
    try {
      const response = await api.post('/create-folder', folderData);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async saveFiles(formData) {
    try {
      const response = await api.post('/save-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async editName(data, formData) {
    const { id, type } = data;
    try {
      let response;
      if (type === 'folder') {
        response = await api.put(`/edit-folder/${id}`, { formData });
      }
      if (type === 'file') {
        response = await api.put(`/edit-file/${id}`, { formData });
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteFiles(fileIds) {
    try {
      const response = await api.delete('/delete-files', {
        data: fileIds,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async deleteFolders(foldersIds) {
    try {
      const response = await api.delete('/delete-folders', {
        data: foldersIds,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async moveItems(data) {
    try {
      const response = await api.post('/move-items', {
        data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async copyItems(data) {
    try {
      const response = await api.post('/copy-items', {
        data,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async downloadData(data) {
    try {
      const response = await api.post(`/download-data`, data, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
