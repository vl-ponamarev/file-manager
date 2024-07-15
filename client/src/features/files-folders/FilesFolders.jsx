import File from 'entities/files/File/File'
import Folder from 'entities/files/Folder/Folder'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'

const FilesDropZone = ({ onDrop, folders }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FILE',
    drop: (item) => {
      const folder = folders.find((folder) =>
        folder.files.some((f) => f.id === item.file.id),
      )
      if (folder) {
        onDrop(item.file, folder.id)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? 'lightblue' : 'transparent',
        padding: '8px',
      }}
    >
      Drop files here to remove from folders
    </div>
  )
}

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

  const handleDropToFolder = (file, folderId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, files: [...folder.files, file] }
          : folder,
      ),
    )
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id))
  }

  const handleDropToFiles = (file, folderId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, files: folder.files.filter((f) => f.id !== file.id) }
          : folder,
      ),
    )
    setFiles((prevFiles) => [...prevFiles, file])
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Section>
          <h2>Files</h2>
          <FilesDropZone onDrop={handleDropToFiles} folders={folders} />
          {files.map((file) => (
            <File key={file.id} file={file} />
          ))}
        </Section>
        <Section>
          <h2>Folders</h2>
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onDrop={handleDropToFolder}
            />
          ))}
        </Section>
      </Container>
    </DndProvider>
  )
}

export default FilesFolders
