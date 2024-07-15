// File.js
import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isDragging ? '#f0f0f0' : 'white')};
`

const File = ({ file }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { file },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <FileWrapper ref={drag} isDragging={isDragging}>
      📄 {file.name}
    </FileWrapper>
  )
}

export default File
