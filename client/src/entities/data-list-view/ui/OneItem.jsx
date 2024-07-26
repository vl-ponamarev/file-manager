import React from 'react'
import { Card, Popover, Typography } from 'antd'
import {
  FolderOutlined,
  FileOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'
import '../DataListView.css'

const OneItem = ({ cardData, handleCardClick, selectedCards }) => {
  const { Text } = Typography

  const content = (
    <div className="custom-content">
      <p>{cardData?.dataName}</p>
      <p>
        {cardData?.type === 'folder' ? null : `size: ${cardData?.fileSize}`}
      </p>
      <p>
        {cardData?.type === 'folder' ? null : `type: ${cardData?.mimetype}`}
      </p>
      <p>{cardData?.dataModified}</p>
    </div>
  )

  const itemsName =
    cardData?.dataName.length > 10
      ? cardData?.dataName.slice(0, 10) + '...'
      : cardData?.dataName

  return (
    <Popover content={content}>
      <Card
        className="card"
        onClick={(event) => handleCardClick(event, cardData)}
        style={{
          backgroundColor: selectedCards?.includes(cardData.id)
            ? '#e6f4ff'
            : null,
        }}
      >
        {cardData?.type === 'back' ? (
          <ArrowUpOutlined className="item-back" />
        ) : cardData?.type === 'file' ? (
          <FileOutlined className="item-file" />
        ) : (
          <FolderOutlined className="item" />
        )}

        <Text className="text">{itemsName}</Text>
      </Card>
    </Popover>
  )
}

const MemoOneItem = React.memo(OneItem)

export default MemoOneItem
