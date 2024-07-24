import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'entities/data-table-view/DataTable'
import { FilesContext } from 'index'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

const DataViewComponent = ({ param, levelUp }) => {
  const [initialData, setInitialData] = useState(null)
  const { filesStore } = useContext(FilesContext)
  const [openFoldersState, setOpenFoldersState] = useState({})

  console.log(filesStore.selectedKeys)
  console.log(filesStore.openFolder)
  const rootFolder = filesStore.openFolder

  console.log(levelUp)
  useEffect(() => {
    console.log('filesStore.folders', filesStore.folders)
    if (filesStore && filesStore.folders && filesStore.files) {
      if (param) {
      } else {
        const rootFolders = filesStore.folders
          .filter((item) => item.rootFolderId === rootFolder)
          //   .sort((a, b) => a.foldername.localeCompare(b.foldername))
          .map((item) => {
            return {
              dataName: item.foldername,
              dataModified: dayjs(item.creationDate).format('DD.MM.YYYY HH:mm'),
              fileSize: '',
              id: item._id,
              type: 'folder',
            }
          })

        console.log('rootFolders', rootFolders)
        const rootFiles = filesStore.files
          .filter((item) => item.folderId === rootFolder)
          .map((item) => {
            return {
              dataName: item.originalname,
              dataModified: dayjs(item.dateModified).format('DD.MM.YYYY HH:mm'),
              fileSize: item.size,
              id: item._id,
              type: 'file',
              mimetype: item.mimetype,
            }
          })
        console.log('rootFiles', rootFiles)
        setInitialData([...rootFolders, ...rootFiles])
      }
    }
  }, [
    filesStore.folders,
    param,
    filesStore.selectedKeys,
    filesStore.files,
    filesStore.openFolder,
  ])

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

  return param ? null : (
    <DataTable
      setOpenFolder={filesStore.setOpenFolder}
      initialData={initialData}
    />
  )
}

export default observer(DataViewComponent)
