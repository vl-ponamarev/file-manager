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
  DownloadOutlined,
} from '@ant-design/icons'

const DropdownMenu = ({ handleMenuClick, id, type }) => {
  return (
    <Dropdown
      trigger={['hover']}
      overlay={
        <Menu onClick={handleMenuClick}>
          {type === 'folder' && (
            <>
              <Menu.Item key={`${id} ${type} new`}>
                <Space>
                  <FolderAddOutlined />
                  <span>New directory</span>
                </Space>
              </Menu.Item>
              <Menu.Item key={`${id} ${type} upload`}>
                <Space>
                  <UploadOutlined />
                  <span>Upload files</span>
                </Space>
              </Menu.Item>{' '}
            </>
          )}
          {type === 'file' && (
            <Menu.Item key={`${id} ${type} download`}>
              <Space>
                <DownloadOutlined />
                <span>Download</span>
              </Space>
            </Menu.Item>
          )}
          <Menu.Item key={`${id} ${type} rename`}>
            <Space>
              <EditOutlined />
              <span>Rename</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} ${type} moveTo`}>
            <Space>
              <ArrowRightOutlined /> <span>Move to</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} ${type} copyTo`}>
            <Space>
              <CopyOutlined /> <span>Copy to</span>
            </Space>
          </Menu.Item>
          <Menu.Item key={`${id} delete ${type} `}>
            <Space>
              <DeleteOutlined /> <span>Delete</span>
            </Space>
          </Menu.Item>
        </Menu>
      }
    >
      <Button
        type="button"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <MoreOutlined style={{ fontSize: '20px' }} />
      </Button>
    </Dropdown>
  );
}

export default DropdownMenu
