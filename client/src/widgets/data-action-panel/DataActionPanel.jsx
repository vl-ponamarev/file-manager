import { Space } from 'antd'
import CreateDirectory from 'features/create-directory/CreateDirectory'
import Rename from 'features/rename/Rename'
import UploadFiles from 'features/uploadFile/UploadFiles'
import React from 'react'

const DataActionPanel = () => {
  return (
    <Space>
      <CreateDirectory />
      <UploadFiles />
      <Rename />
    </Space>
  )
}

export default DataActionPanel
