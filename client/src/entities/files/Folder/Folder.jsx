// Folder.js
import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import File from '../File/File'

const FolderWrapper = styled.div`
  border: 1px solid blue;
  padding: 16px;
  margin: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.isOver ? '#e0f7fa' : 'white')};
  cursor: pointer;
`

const Folder = ({ folder, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FILE',
    drop: (item) => onDrop(item.file, folder.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <FolderWrapper ref={drop} isOver={isOver}>
      <h3>📁 {folder.name}</h3>
      <div>
        {folder.files.map((file) => (
          <File key={file.id} file={file} />
        ))}
      </div>
    </FolderWrapper>
  )
}

export default Folder
