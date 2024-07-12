// App.js
import File from 'entities/files/File/File'
import Folder from 'entities/files/Folder/Folder'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`

const Section = styled.div`
  flex: 1;
  margin: 0 8px;
`

const FilesFolders = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Folder 1', files: [] },
    { id: 2, name: 'Folder 2', files: [] },
  ])

  const [files, setFiles] = useState([
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' },
  ])

  const handleDrop = (file, folderId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, files: [...folder.files, file] }
          : folder,
      ),
    )
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Section>
          <h2>Files</h2>
          {files.map((file) => (
            <File key={file.id} file={file} />
          ))}
        </Section>
        <Section>
          <h2>Folders</h2>
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder} onDrop={handleDrop} />
          ))}
        </Section>
      </Container>
    </DndProvider>
  )
}

export default FilesFolders
