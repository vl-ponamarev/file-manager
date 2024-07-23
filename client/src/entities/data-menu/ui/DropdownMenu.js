import { Button, Dropdown, Menu, Space } from 'antd'
import React from 'react'
import {
  UploadOutlined,
  MoreOutlined,
  FolderAddOutlined,
  EditOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

const DropdownMenu = ({ handleMenuClick, id }) => {
  return (
    <Dropdown
      trigger={['hover']}
      overlay={
        <Menu onClick={handleMenuClick}>
          <Menu.Item key={`${id} new`}>
            <Space>
              <FolderAddOutlined />
              <span>New directory</span>
            </Space>
          </Menu.Item>

          <Menu.Item key={`${id} upload`}>
            <Space>
              <UploadOutlined />
              <span>Upload files</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} rename`}>
            <Space>
              <EditOutlined />
              <span>Rename</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} moveTo`}>
            <Space>
              <ArrowRightOutlined /> <span>Move to</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} copyTo`}>
            <Space>
              <CopyOutlined /> <span>Copy to</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} delete`}>
            <Space>
              <DeleteOutlined /> <span>Delete</span>
            </Space>
          </Menu.Item>
        </Menu>
      }
    >
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <MoreOutlined style={{ fontSize: '20px' }} />
      </Button>
    </Dropdown>
  )
}

export default DropdownMenu
