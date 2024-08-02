import { Button } from 'antd'
import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'

const Move = () => {
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(true)
  }
  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<ArrowRightOutlined />}
        onClick={onClick}
      >
        RENAME
      </Button>
      {/* {open && <EditNameModal open={open} setOpen={setOpen} method="move" />} */}
    </>
  )
}

export default Move
