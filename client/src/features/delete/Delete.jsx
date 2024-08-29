import { Button, Popconfirm } from 'antd'
import React, { useContext } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { FilesContext } from 'index'
import { observer } from 'mobx-react-lite'

const Delete = () => {
  const { filesStore } = useContext(FilesContext)

  const onClick = () => {
    //TODO добавить добавление в dataToDelete дочерних файлов и папок
    const dataToDelete = filesStore.selectedRowKeysStore.reduce(
      (acc, item) => {
        const currentItem = filesStore.files.find((file) => file._id === item)
        if (currentItem) {
          acc.files.push(item)
        } else {
          acc.folders.push(item)
        }
        return acc
      },
      { files: [], folders: [] },
    )

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

    dataToDelete.folders.forEach(item => {
      getChildFolderIds(filesStore.folders, item);
    });

    const allFolders = [...dataToDelete?.folders, ...childFolders];
    allFolders.forEach(folder => {
      filesStore.files
        .filter(file => file.folderId === folder)
        .forEach(file => dataToDelete.files.push(file._id));
    });
    console.log(allFolders);

    console.log(dataToDelete)

    console.log({ ...dataToDelete, folders: allFolders });

    filesStore.deleteData({ ...dataToDelete, folders: allFolders });
  }
  return (
    <Popconfirm
      title="Are you sure you want to delete this item?"
      onConfirm={onClick}
    >
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<DeleteOutlined />}
      >
        DELETE
      </Button>
    </Popconfirm>
  )
}

export default observer(Delete)
