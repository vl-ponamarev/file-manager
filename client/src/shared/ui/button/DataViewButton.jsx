import React from 'react'
import { Button } from 'antd'
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'

export function DataViewButton({ setParam, param }) {
  const onButtonClick = () => {
    setParam(!param)
  }
  return (
    <Button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        onButtonClick()
      }}
    >
      {param ? (
        <UnorderedListOutlined style={{ fontSize: '20px' }} />
      ) : (
        <AppstoreOutlined style={{ fontSize: '20px' }} />
      )}
    </Button>
  )
}
