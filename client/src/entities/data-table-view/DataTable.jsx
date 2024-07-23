import React, { useContext, useEffect, useState } from 'react'
import { Table, Menu, Dropdown, Checkbox } from 'antd'
import './DataTable.css'
import { FilesContext } from 'index'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { FolderOutlined } from '@ant-design/icons'

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
  },
  {
    title: 'File Size',
    dataIndex: 'fileSize',
    key: 'fileSize',
    sorter: (a, b) => a.age - b.age,
  },
]

const DataTable = ({ initialData }) => {
  const { filesStore } = useContext(FilesContext)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)
  // const [initialData, setInitialData] = useState(null)

  console.log('initialData', initialData)

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

  const handleMenuClick = (action) => {
    console.log(`Action: ${action}, Selected Rows: ${selectedRowKeys}`)
    setContextMenu(null)
    setSelectedRowKeys([])
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

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleMenuClick('Action 1')}>
        Action 1
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleMenuClick('Action 2')}>
        Action 2
      </Menu.Item>
    </Menu>
  )

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
              console.log(record.id)
              console.log(record)
              const { id } = record

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
