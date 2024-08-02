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
    console.log(dataToDelete)
    filesStore.deleteData(dataToDelete)
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
