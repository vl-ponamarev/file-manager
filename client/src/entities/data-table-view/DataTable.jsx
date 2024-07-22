import React, { useContext, useEffect, useState } from 'react'
import { Table, Menu, Dropdown, Checkbox } from 'antd'
import './DataTable.css'
import { FilesContext } from 'index'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

const columns = [
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

const DataTable = () => {
  const { filesStore } = useContext(FilesContext)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [initialData, setInitialData] = useState(null)

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

  useEffect(() => {
    console.log('filesStore.folders', filesStore.folders)
    if (filesStore && filesStore.folders) {
      const rootFolders = filesStore.folders
        .filter((item) => item.rootFolderId === 'null')
        .sort((a, b) => a.foldername.localeCompare(b.foldername))
        .map((item) => {
          return {
            dataName: item.foldername,
            dataModified: item.creationDate,
            fileSize: '',
            id: uuidv4(),
          }
        })

      console.log('rootFolders', rootFolders)
      const rootFiles = filesStore.files.filter(
        (item) => item.rootFolderId === 'null',
      )
      setInitialData(rootFolders)
    }
  }, [filesStore.folders])

  console.log('filesStore.folders', filesStore.folders)

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
          onCell: (record, rowIndex) => console.log(record, rowIndex),
        }}
        columns={columns}
        dataSource={initialData}
        rowClassName={(record, index) => {
          console.log(record, index)
          return record.id === selectedRowId ? 'selected-row' : ''
        }}
        onRow={(record, index) => {
          return {
            onContextMenu: (event) => handleRowContextMenu(event, record),
            onClick: () => {
              console.log(record)
              setSelectedRowId(record.id)
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
