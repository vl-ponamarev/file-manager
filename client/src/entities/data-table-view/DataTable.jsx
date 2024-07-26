import React, { useContext, useState } from 'react'
import { Table, Menu, Dropdown, Flex } from 'antd'
import './DataTable.css'
import { FilesContext } from 'index'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import {
  FolderOutlined,
  MoreOutlined,
  FileOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'

const DataTable = ({
  initialData,
  setLevelUp,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  console.log(initialData)
  const { filesStore } = useContext(FilesContext)
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)

  console.log(selectedRowId)

  console.log(filesStore.selectedRowKeys)
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
    // filesStore.setSelectedRowKeys([])
  }
  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        if (record.type === 'folder') {
          return <FolderOutlined />
        } else if (record.type === 'file') {
          return <FileOutlined />
        } else if (record.type === 'back') {
          return <ArrowUpOutlined />
        }
        return null
      },
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
      width: '10%',
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
      // sorter: (a, b) => a.mimetype.localeCompare(b.mimetype),
      width: '10%',
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        if (record.type === 'folder' || record.type === 'file') {
          return (
            <Dropdown overlay={menu(record)} trigger={['click']}>
              <MoreOutlined
                className="action-button"
                style={{ fontSize: '20px' }}
              />
            </Dropdown>
          )
        } else if (record.type === 'back') {
          return null
        }
      },
      width: '2%',
    },
  ]

  // const onSelectChange = (selectedRowKeys) => {
  //   filesStore.setSelectedRowKeys(selectedRowKeys)
  // }

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

  const onSelectChange = (newSelectedRowKeys) => {
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  console.log(selectedRowKeys)
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      const newSelectedRowObjects = [...filesStore.selectedRowObjects]
      if (selectedRowKeys.includes(record.id)) {
        filesStore.setSelectedRowObjects(
          newSelectedRowObjects.filter((obj) => obj.id !== record.id),
        )
      } else {
        newSelectedRowObjects.push({ record })
        filesStore.setSelectedRowObjects(newSelectedRowObjects)
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        filesStore.setSelectedRowObjects([
          ...filesStore.selectedRowObjects,
          ...changeRows,
        ])
      } else {
        filesStore.setSelectedRowObjects([])
      }
      console.log(selected)
      console.log(changeRows)
      console.log(selectedRows)
    },
  }

  console.log(filesStore.selectedRowObjects)
  const hasSelected = selectedRowKeys.length > 0
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
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
              console.log('record', record)

              if (id) {
                setSelectedRowId(id)
              }
            },
            onDoubleClick: () => {
              const { id } = record
              console.log(record)
              console.log(id)
              if (id !== 'back' && record.type === 'folder') {
                console.log('ok')
                setSelectedRowKeys([])
                filesStore.setOpenFolder(id)
                filesStore.setSelectedKeys([id])
              } else if (record.type === 'file') {
                console.log('ok')
                return
              } else {
                console.log('ok')
                setLevelUp((prev) => !prev)
              }
            },
          }
        }}
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
    </Flex>
  )
}

export default observer(DataTable)
