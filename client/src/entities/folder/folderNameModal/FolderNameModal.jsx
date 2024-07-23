import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import Draggable from 'react-draggable'
import { observer } from 'mobx-react-lite'
import { FilesContext } from 'index'
const FolderNameModal = ({ open, setOpen }) => {
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  })
  const [value, setValue] = useState('')

  const { filesStore } = useContext(FilesContext)

  const date = new Date()

  // const [openFolder, setOpenFolder] = useState([])

  // useEffect(() => {
  //   filesStore.openFolder.length > 0
  //     ? setOpenFolder(filesStore.openFolder)
  //     : setOpenFolder('null')
  // }, [filesStore.openFolder])

  console.log(filesStore.openFolder)

  const draggleRef = useRef(null)
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = (e) => {
    // console.log(e)
    filesStore.createFolder({
      foldername: value,
      rootFolderId: filesStore.openFolder,
      creationDate: date,
    })
    setOpen(false)
  }
  const handleCancel = (e) => {
    setOpen(false)
  }
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }
  return (
    <>
      <Button onClick={showModal}>Open Draggable Modal</Button>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Folder Name
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Input
          placeholder="Enter Folder Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default observer(FolderNameModal)
