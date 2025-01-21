import { makeAutoObservable } from 'mobx'
import FilesService from 'shared/api/filesService/filesService'

export default class FilesStore {
  files = [];
  folders = [];
  openFolder = [];
  createdFolder = [];
  selectedKeys = '';
  selectedRowObjects = [];
  openFolderParentsList = [];
  selectedRowKeysStore = [];
  clearSelectedRowKeysButtonState = false;
  saveOpenKeys = {
    status: false,
    folderId: null,
  };

  dataTree = [];

  rootKey = '669f6de3daad41e24782120f';

  constructor() {
    makeAutoObservable(this);
  }

  setFiles(files) {
    this.files = files;
  }

  setOpenFolderParentsList(openFolderParentsList) {
    this.openFolderParentsList = openFolderParentsList;
  }

  setSaveOpenKeys(saveOpenKeys) {
    this.saveOpenKeys = saveOpenKeys;
  }

  setClearSelectedRowKeysButtonState(clearSelectedRowKeysButtonState) {
    this.clearSelectedRowKeysButtonState = clearSelectedRowKeysButtonState;
  }
  setSelectedRowKeysStore(selectedRowKeysStore) {
    this.selectedRowKeysStore = selectedRowKeysStore;
  }

  setFolders(folders) {
    this.folders = folders;
  }

  setDataTree(data) {
    this.dataTree = data;
  }

  setSelectedKeys(selectedKeys) {
    this.selectedKeys = selectedKeys;
  }

  setSelectedRowObjects(selectedRowObjects) {
    this.selectedRowObjects = selectedRowObjects;
  }

  setOpenFolder(openFolder) {
    this.openFolder = openFolder;
  }

  setCreatedFolder(createdFolder) {
    this.createdFolder = createdFolder;
  }

  async getFiles() {
    try {
      const response = await FilesService.getFiles();
      this.setFiles(response.data.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  async getFolders() {
    try {
      const response = await FilesService.getFolders();
      this.setFolders(response.data.reverse());
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  async createFolder(folderData) {
    try {
      const response = await FilesService.createFolder(folderData);
      if (response.data.success) {
        this.setCreatedFolder(response.data.data._id);
        this.getFolders();
        return response;
      }
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  async saveFiles(formData) {
    try {
      const response = await FilesService.saveFiles(formData);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteData(data) {
    const { files, folders } = data;
    const res = [];
    try {
      const resFiles = files.length > 0 ? await FilesService.deleteFiles(files) : null;
      res.push(resFiles);
      if (resFiles !== null) {
        this.getFiles();
      }
      const resFolders = folders.length > 0 ? await FilesService.deleteFolders(folders) : null;
      if (resFolders !== null) {
        this.getFolders();
      }
      res.push(resFolders);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async editName(data, formData) {
    try {
      const response = await FilesService.editName(data, formData);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async moveData(data) {
    try {
      const response = await FilesService.moveItems(data);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async copyData(data) {
    try {
      const response = await FilesService.copyItems(data);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async downloadData(data) {
    try {
      const response = await FilesService.downloadData(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
