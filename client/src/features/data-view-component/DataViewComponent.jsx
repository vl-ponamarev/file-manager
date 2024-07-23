import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'entities/data-table-view/DataTable'
import { FilesContext } from 'index'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

const DataViewComponent = ({ param }) => {
  const [initialData, setInitialData] = useState(null)
  const { filesStore } = useContext(FilesContext)

  console.log(filesStore.selectedKeys)
  console.log(filesStore.openFolder)
  const rootFolder = filesStore.openFolder

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
              dataModified: item.creationDate,
              fileSize: '',
              id: item._id,
              type: 'folder',
            }
          })

        console.log('rootFolders', rootFolders)
        const rootFiles = filesStore.files.filter(
          (item) => item.rootFolderId === 'null',
        )
        setInitialData(rootFolders)
      }
    }
  }, [
    filesStore.folders,
    param,
    filesStore.selectedKeys,
    filesStore.files,
    filesStore.openFolder,
  ])

  return param ? null : (
    <DataTable
      setOpenFolder={filesStore.setOpenFolder}
      initialData={initialData}
    />
  )
}

export default observer(DataViewComponent)
