import React, { useContext, useEffect, useState } from 'react'
import { Table, Menu, Dropdown, Checkbox, Button } from 'antd'
import './DataTable.css'
import { FilesContext } from 'index'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { FolderOutlined, MoreOutlined } from '@ant-design/icons'

const DataTable = ({ initialData }) => {
  const { filesStore } = useContext(FilesContext)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={(e) => handleMenuClick('Action 1', record, e)}
      >
        Action 1
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => handleMenuClick('Action 2', record, e)}
      >
        Action 2
      </Menu.Item>
    </Menu>
  )
  console.log('initialData', initialData)
  const handleMenuClick = (action, record, e) => {
    console.log('Action:', action)
    console.log('Record:', record)
    console.log('Event:', e)
    setContextMenu(null)
    setSelectedRowKeys([])
  }
  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: () => <FolderOutlined dataIndex={'key'} />,
      width: '2%',
    },
    {
      title: 'Name',
      dataIndex: 'dataName',
      key: 'dataName',
      sorter: (a, b) => a.dataName.localeCompare(b.dataName),
    },
    {
      title: 'Data Modified',
      dataIndex: 'dataModified',
      key: 'dataModified',
      sorter: (a, b) =>
        dayjs(a.dataModified).isBefore(dayjs(b.dataModified)) ? -1 : 1,
      width: '20%',
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      sorter: (a, b) => a.fileSize - b.fileSize,
      width: '10%',
    },
    {
      title: 'File Type',
      dataIndex: 'mimetype',
      key: 'mimetype',
      sorter: (a, b) => a.mimetype.localeCompare(b.mimetype),
      width: '10%',
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        return (
          <Dropdown overlay={menu(record)} trigger={['click']}>
            <MoreOutlined
              className="action-button"
              style={{ fontSize: '20px' }}
            />
          </Dropdown>
        )
      },
      width: '2%',
    },
  ]

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleRowContextMenu = (event, record) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
            record,
          }
        : null,
    )
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    renderCell: (_, record) => (
      <Checkbox
        checked={selectedRowKeys.includes(record.id)}
        onChange={() => {
          const newSelectedRowKeys = [...selectedRowKeys]
          if (newSelectedRowKeys.includes(record.id)) {
            setSelectedRowKeys(
              newSelectedRowKeys.filter((key) => key !== record.id),
            )
          } else {
            newSelectedRowKeys.push(record.id)
            setSelectedRowKeys(newSelectedRowKeys)
          }
        }}
        className={
          selectedRowKeys.includes(record.id) ? 'ant-checkbox-wrapper' : ''
        }
      />
    ),
  }

  return (
    <div>
      <Table
        rowSelection={{
          ...rowSelection,
          renderCell: (_, record, index) => (
            <Checkbox
              checked={selectedRowKeys.includes(record.id)}
              onChange={() => {
                const newSelectedRowKeys = [...selectedRowKeys]
                if (newSelectedRowKeys.includes(record.id)) {
                  setSelectedRowKeys(
                    newSelectedRowKeys.filter((key) => key !== record.id),
                  )
                } else {
                  newSelectedRowKeys.push(record.id)
                  setSelectedRowKeys(newSelectedRowKeys)
                }
              }}
              className={
                selectedRowKeys.includes(record.id)
                  ? 'ant-checkbox-wrapper'
                  : ''
              }
            />
          ),
          // onCell: (record, rowIndex) => console.log(record, rowIndex),
        }}
        columns={columns}
        dataSource={initialData}
        rowClassName={(record, index) => {
          // console.log(record, index)
          return record.id === selectedRowId ? 'selected-row' : ''
        }}
        onRow={(record, index) => {
          return {
            onContextMenu: (event) => handleRowContextMenu(event, record),
            onClick: () => {
              const { id } = record

              if (id) {
                console.log('ok')
                setSelectedRowId(id)
              }
            },
            onDoubleClick: () => {
              const { id } = record
              console.log(id)
              if (id) {
                console.log('ok')
                setSelectedRowId(id)
                filesStore.setOpenFolder(id)
                filesStore.setSelectedKeys([id])
              }
            },
          }
        }}
        rowKey="id"
      />
      {contextMenu && (
        <Dropdown
          overlay={menu}
          trigger={['click']}
          visible
          onVisibleChange={(visible) => !visible && setContextMenu(null)}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <div
            style={{
              position: 'absolute',
              top: contextMenu.mouseY,
              left: contextMenu.mouseX,
              zIndex: 10000,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          />
        </Dropdown>
      )}
    </div>
  )
}

export default observer(DataTable)
