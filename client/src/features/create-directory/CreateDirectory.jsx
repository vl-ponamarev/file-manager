import { Button } from 'antd'
import React from 'react'
import { FolderAddOutlined } from '@ant-design/icons'

const CreateDirectory = () => {
  return (
    <Button
      style={{
        backgroundColor: '#1976d2',
        borderColor: '#1976d2',
        color: 'white',
      }}
      icon={<FolderAddOutlined />}
    >
      NEW DIRECTORY
    </Button>
  )
}

export default CreateDirectory
