import { Button } from 'antd'
import React, { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import FolderNameModal from 'entities/folder/folderNameModal/FolderNameModal'

const Rename = () => {
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(true)
  }
  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<EditOutlined />}
        onClick={onClick}
      >
        RENAME
      </Button>
      {open && <FolderNameModal open={open} setOpen={setOpen} method="edit" />}
    </>
  )
}

export default Rename
