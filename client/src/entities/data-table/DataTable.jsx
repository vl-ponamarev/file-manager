import React, { useState } from 'react'
import { Table, Menu, Dropdown, Checkbox } from 'antd'
import './DataTable.css'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
]

const initialData = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

const DataTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [contextMenu, setContextMenu] = useState(null)

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

  const items = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]

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
        }}
        columns={columns}
        dataSource={initialData}
        onRow={(record) => ({
          onContextMenu: (event) => handleRowContextMenu(event, record),
        })}
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

export default DataTable
