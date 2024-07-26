import React, { useContext, useState } from 'react'
import { Breadcrumb, Button, Col, Row, Space } from 'antd'
import { ArrowUpOutlined, ClearOutlined } from '@ant-design/icons'
import { DataViewButton } from 'shared/ui/button'
import { observer } from 'mobx-react-lite'
import { FilesContext } from 'index'

const DataViewPanel = ({ param, setParam, levelUp, setLevelUp }) => {
  const { filesStore } = useContext(FilesContext)
  const selectedRowKeysStore = filesStore.selectedRowKeysStore
  const hasSelected = selectedRowKeysStore.length > 0

  console.log(selectedRowKeysStore)
  const [loading, setLoading] = useState(false)
  const start = () => {
    setLoading(true)
    console.log('ok')
    setTimeout(() => {
      filesStore.setClearSelectedRowKeysButtonState(
        !filesStore.clearSelectedRowKeysButtonState,
      )
      filesStore.setSelectedRowObjects([])
      setLoading(false)
    }, 200)
  }
  console.log(filesStore.clearSelectedRowKeysButtonState)

  return (
    <Row justify="space-between" align="middle">
      <Space>
        <Button
          style={{
            margin: '16px 0',
            border: 'none',
          }}
          onClick={() => setLevelUp(!levelUp)}
        >
          <ArrowUpOutlined />
        </Button>
        <Breadcrumb
          style={{
            margin: '20px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>MainPage</Breadcrumb.Item>
        </Breadcrumb>
      </Space>
      <Space>
        <Button
          style={{
            backgroundColor: hasSelected ? '#1976d2' : 'gray',
            borderColor: hasSelected ? '#1976d2' : 'gray',
            color: 'white',
            display: selectedRowKeysStore?.length ? 'flex' : 'none',
          }}
          icon={<ClearOutlined />}
          onClick={() => start()}
          disabled={!hasSelected}
          loading={loading}
        >
          CLEAR SELECTION
        </Button>
        <DataViewButton setParam={setParam} param={param} />
      </Space>
    </Row>
  )
}

export default observer(DataViewPanel)
