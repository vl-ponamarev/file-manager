import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import File from 'entities/files/File/File'

const FolderWrapper = styled.div`
  padding: 16px;
  border: 1px solid black;
  margin: 4px;
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
    <FolderWrapper
      ref={drop}
      style={{ backgroundColor: isOver ? 'lightgreen' : 'white' }}
    >
      <h3>{folder.name}</h3>
      {folder.files.map((file) => (
        <File key={file.id} file={file} />
      ))}
    </FolderWrapper>
  )
}

export default Folder
