import { Space } from 'antd'
import Copy from 'features/copy/Copy';
import CreateDirectory from 'features/create-directory/CreateDirectory';
import Delete from 'features/delete/Delete';
import Move from 'features/move/Move';
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
      <Move />
      <Copy />
    </Space>
  );
}

export default DataActionPanel
