import React, { useCallback, useContext, useState } from 'react'
import './DataListView.css'
import MemoOneItem from './ui/OneItem'
import { FilesContext } from 'index'

const DataListView = ({
  initialData,
  setLevelUp,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  console.log(initialData)
  const { filesStore } = useContext(FilesContext)

  const [clickTimeout, setClickTimeout] = useState(null)

  const handleCardClick = useCallback(
    (event, cardData) => {
      const { id } = cardData
      console.log(cardData)
      if (clickTimeout) {
        clearTimeout(clickTimeout)
        setClickTimeout(null)
        console.log('Double-click event', event)
        if (id !== 'back' && cardData.type === 'folder') {
          console.log('ok')
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
                return prevSelectedRowKeys.filter((id) => id !== id)
              }
              return [...prevSelectedRowKeys, id]
            })
          } else if (event.type === 'click') {
            setSelectedRowKeys([id])
          }
          console.log('Single-click event', event)
        }, 300) // Adjust the timeout duration for double-click detection as needed
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
    </div>
  )
}

export default DataListView
