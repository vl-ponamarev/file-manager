import { Button } from 'antd'
import React, { useState } from 'react'
import { FolderAddOutlined } from '@ant-design/icons'
import { EditNameModal } from 'entities/folder/ui';

const CreateDirectory = () => {
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
        icon={<FolderAddOutlined />}
        onClick={onClick}
      >
        NEW DIRECTORY
      </Button>
      {open && <EditNameModal open={open} setOpen={setOpen} method="create" />}
    </>
  )
}

export default CreateDirectory
