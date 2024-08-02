import React, { useCallback, useContext, useState } from 'react'
import './DataListView.css'
import MemoOneItem from './ui/OneItem'
import { FilesContext } from 'index'
import { Dropdown, Menu } from 'antd'

const DataListView = ({
  initialData,
  setLevelUp,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  console.log(initialData)
  const { filesStore } = useContext(FilesContext)
  const [clickTimeout, setClickTimeout] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)

  console.log(contextMenu)

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
  console.log(selectedRowKeys)

  const handleCardClick = useCallback(
    (event, cardData) => {
      const { id } = cardData
      console.log(cardData)
      console.log(event.type)
      event.preventDefault() // предотвратить стандартное контекстное меню браузера

      if (event.type === 'contextmenu') {
        setContextMenu({
          mouseX: event.clientX,
          mouseY: event.clientY,
          record: cardData,
        })
        if (selectedRowKeys.length > 0) {
          return
        }
        setSelectedRowKeys([id])
        return
      }

      if (clickTimeout) {
        clearTimeout(clickTimeout)
        setClickTimeout(null)
        console.log('Double-click event', event)
        if (id !== 'back' && cardData.type === 'folder') {
          console.log('ok', id)
          setSelectedRowKeys([])
          filesStore.setOpenFolder(id)
          filesStore.setSelectedKeys([id])
        } else if (cardData.type === 'file') {
          console.log('ok')
          return
        } else {
          console.log('ok')
          setLevelUp((prev) => !prev)
        }
      } else {
        const timeout = setTimeout(() => {
          setClickTimeout(null)
          if (event.ctrlKey) {
            setSelectedRowKeys((prevSelectedRowKeys) => {
              if (prevSelectedRowKeys.includes(id)) {
                return prevSelectedRowKeys.filter((key) => key !== id)
              }
              return [...prevSelectedRowKeys, id]
            })
          } else if (event.type === 'click') {
            setSelectedRowKeys([id])
          }
          console.log('Single-click event', event)
        }, 200)
        setClickTimeout(timeout)
      }
    },
    [clickTimeout, setSelectedRowKeys],
  )

  return (
    <div className="data-list-view">
      {initialData?.map((item) => (
        <MemoOneItem
          key={item.id}
          cardData={item}
          handleCardClick={handleCardClick}
          selectedCards={selectedRowKeys}
        />
      ))}

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

export default DataListView
