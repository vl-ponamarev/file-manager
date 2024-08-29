import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'entities/data-table-view/DataTable'
import { FilesContext } from 'index';
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import DataListView from 'entities/data-list-view/DataListView'

const DataViewComponent = ({ param, levelUp, setLevelUp }) => {
  const [initialData, setInitialData] = useState(null)
  const { filesStore } = useContext(FilesContext)
  const [openFoldersState, setOpenFoldersState] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rootFolder = filesStore.openFolder
  const rootKey = filesStore.rootKey

  useEffect(() => {
    filesStore.setSelectedRowKeysStore(selectedRowKeys);
  }, [selectedRowKeys]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [filesStore.openFolder]);

  useEffect(() => {
    if (filesStore && filesStore.folders && filesStore.files) {
      if (param) {
        const rootFolders = filesStore.folders
          .filter(item => item.rootFolderId === rootFolder)
          .map(item => {
            return {
              dataName: item.foldername,
              dataModified: dayjs(item.creationDate).format('DD.MM.YYYY HH:mm'),
              fileSize: '',
              id: item._id,
              type: 'folder',
            };
          });

        console.log(filesStore.files);
        const rootFiles = filesStore.files
          .filter(item => item.folderId === rootFolder)
          .map(item => {
            return {
              dataName: item.originalname,
              dataModified: dayjs(item.dateModified).format('DD.MM.YYYY HH:mm'),
              fileSize: item.size,
              id: item._id,
              type: 'file',
              mimetype: item.mimetype,
            };
          });
        if (rootFolder === rootKey) {
          setInitialData([...rootFolders, ...rootFiles]);
        } else {
          setInitialData([
            { dataName: '...', id: 'back', type: 'back' },
            ...rootFolders,
            ...rootFiles,
          ]);
        }
      } else {
        const rootFolders = filesStore.folders
          .filter(item => item.rootFolderId === rootFolder)
          //   .sort((a, b) => a.foldername.localeCompare(b.foldername))
          .map(item => {
            return {
              dataName: item.foldername,
              dataModified: dayjs(item.creationDate).format('DD.MM.YYYY HH:mm'),
              fileSize: '',
              id: item._id,
              type: 'folder',
            };
          });

        console.log('rootFolders', rootFolders);

        const rootFiles = filesStore.files
          .filter(item => item.folderId === rootFolder)
          .map(item => {
            return {
              dataName: item.originalname,
              dataModified: dayjs(item.dateModified).format('DD.MM.YYYY HH:mm'),
              fileSize: item.size,
              id: item._id,
              type: 'file',
              mimetype: item.mimetype,
            };
          });
        console.log('rootFiles', rootFiles);
        if (rootFolder === '669f6de3daad41e24782120f') {
          setInitialData([...rootFolders, ...rootFiles]);
        } else {
          setInitialData([
            { dataName: '...', id: 'back', type: 'back' },
            ...rootFolders,
            ...rootFiles,
          ]);
        }
      }
    }
  }, [filesStore.folders, param, filesStore.selectedKeys, filesStore.files, filesStore.openFolder]);

  useEffect(() => {
    setTimeout(() => {
      setSelectedRowKeys([])
    }, 200)
  }, [filesStore.clearSelectedRowKeysButtonState])

  useEffect(() => {
    if (filesStore && filesStore.folders) {
      const openFolderItem = filesStore.folders.find(
        (item) => item._id === filesStore.openFolder,
      )

      if (openFolderItem) {
        const { rootFolderId } = openFolderItem
        const parentFolder = filesStore.folders.find(
          (item) => item._id === rootFolderId,
        )

        if (parentFolder) {
          setOpenFoldersState({
            openFolderItem: openFolderItem._id,
            parentFolder: parentFolder._id,
          })
          console.log('actualFolder', parentFolder)
          filesStore.setOpenFolder(parentFolder._id)
        }
      }
    }
  }, [levelUp])

  console.log(openFoldersState)

  return param ? (
    <DataListView
      initialData={initialData}
      setLevelUp={setLevelUp}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
    />
  ) : (
    <DataTable
      initialData={initialData}
      setLevelUp={setLevelUp}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
    />
  )
}

export default observer(DataViewComponent)
