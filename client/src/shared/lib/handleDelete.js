const handleDelete = (filesStore, selectedFolder = undefined, type = '') => {
  const dataToDelete = !selectedFolder
    ? filesStore?.selectedRowKeysStore?.reduce(
        (acc, item) => {
          const currentItem = filesStore.files.find(file => file._id === item);
          if (currentItem) {
            acc.files.push(item);
          } else {
            acc.folders.push(item);
          }
          return acc;
        },
        { files: [], folders: [] },
      ) || {
        files: [],
        folders: [],
      }
    : {
        files: type === 'file' ? [selectedFolder] : [],
        folders: type === 'folder' ? [selectedFolder] : [],
      } || {
        files: [],
        folders: [],
      };

  const childFolders = [];

  const getChildFolderId = (data, id) => {
    return data.find(item => item.rootFolderId === id);
  };

  const getChildFolderIds = (data, id) => {
    const folder = getChildFolderId(data, id);
    if (folder) {
      childFolders.push(folder._id);
      getChildFolderIds(data, folder._id);
    }
  };

  dataToDelete?.folders.forEach(item => {
    getChildFolderIds(filesStore?.folders, item);
  });
  const allFolders = [...dataToDelete?.folders, ...childFolders];
  allFolders.forEach(folder => {
    filesStore.files
      .filter(file => file.folderId === folder)
      .forEach(file => dataToDelete.files.push(file._id));
  });

  filesStore.deleteData({ ...dataToDelete, folders: allFolders });
};

export default handleDelete;
