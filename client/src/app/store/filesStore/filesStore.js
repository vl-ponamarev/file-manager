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
    console.log(openFolder);
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
      console.log(err);
    }
  }

  async getFolders() {
    try {
      const response = await FilesService.getFolders();
      this.setFolders(response.data.reverse());
    } catch (err) {
      console.log(err.response?.data?.message);
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
      console.log(err.response?.data?.message);
    }
  }

  async saveFiles(formData) {
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await FilesService.saveFiles(formData);
      console.log(response);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteData(data) {
    const { files, folders } = data;
    const res = [];
    console.log(data);
    try {
      const resFiles = files.length > 0 ? await FilesService.deleteFiles(files) : null;
      res.push(resFiles);
      console.log(resFiles);
      if (resFiles !== null) {
        this.getFiles();
      }
      const resFolders = folders.length > 0 ? await FilesService.deleteFolders(folders) : null;
      if (resFolders !== null) {
        this.getFolders();
      }
      res.push(resFolders);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async editName(data, formData) {
    try {
      const response = await FilesService.editName(data, formData);
      console.log(response);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async moveData(data) {
    try {
      const response = await FilesService.moveItems(data);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async copyData(data) {
    try {
      const response = await FilesService.copyItems(data);
      this.getFolders();
      this.getFiles();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
