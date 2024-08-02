import { Space } from 'antd'
import CreateDirectory from 'features/create-directory/CreateDirectory'
import Delete from 'features/delete/Delete'
import Rename from 'features/rename/Rename'
import UploadFiles from 'features/uploadFile/UploadFiles'
import React from 'react'

const DataActionPanel = () => {
  return (
    <Space>
      <CreateDirectory />
      <UploadFiles />
      <Rename />
      <Delete />
    </Space>
  )
}

export default DataActionPanel
