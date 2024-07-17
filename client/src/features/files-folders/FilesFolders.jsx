// import File from 'entities/files/File/File'
// import Folder from 'entities/files/Folder/Folder'
// import React, { useState } from 'react'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import styled from 'styled-components'
// import { useDrop } from 'react-dnd'

// const FilesDropZone = ({ onDrop, folders }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: 'FILE',
//     drop: (item) => {
//       const folder = folders.find((folder) =>
//         folder.files.some((f) => f.id === item.file.id),
//       )
//       if (folder) {
//         onDrop(item.file, folder.id)
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   })

//   return (
//     <div
//       ref={drop}
//       style={{
//         backgroundColor: isOver ? 'lightblue' : 'transparent',
//         padding: '8px',
//         border: '1px dashed gray',
//       }}
//     >
//       Drop files here to remove from folders
//     </div>
//   )
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 16px;
// `

// const Section = styled.div`
//   flex: 1;
//   margin: 0 8px;
// `

// const FilesFolders = () => {
//   const [folders, setFolders] = useState([
//     { id: 1, name: 'Folder 1', files: [] },
//     { id: 2, name: 'Folder 2', files: [] },
//   ])

//   const [files, setFiles] = useState([
//     { id: 1, name: 'File 1' },
//     { id: 2, name: 'File 2' },
//   ])

//   const handleDropToFolder = (file, folderId) => {
//     setFolders((prevFolders) =>
//       prevFolders.map((folder) =>
//         folder.id === folderId
//           ? { ...folder, files: [...folder.files, file] }
//           : folder,
//       ),
//     )
//     setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id))
//   }

//   const handleDropToFiles = (file, folderId) => {
//     setFolders((prevFolders) =>
//       prevFolders.map((folder) =>
//         folder.id === folderId
//           ? { ...folder, files: folder.files.filter((f) => f.id !== file.id) }
//           : folder,
//       ),
//     )
//     setFiles((prevFiles) => [...prevFiles, file])
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Container>
//         <Section>
//           {folders.map((folder) => (
//             <Folder
//               key={folder.id}
//               folder={folder}
//               onDrop={handleDropToFolder}
//             />
//           ))}
//           <FilesDropZone onDrop={handleDropToFiles} folders={folders} />
//           {files.map((file) => (
//             <File key={file.id} file={file} />
//           ))}
//         </Section>
//       </Container>
//     </DndProvider>
//   )
// }

// export default FilesFolders

import FilesFoldersTable from 'entities/files/data-table/DataTable'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
// Импортируйте здесь FilesFoldersTable, как показано в предыдущем примере

const FilesFoldersDnd = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'Folder 1',
      files: [{ id: 3, name: 'File 3' }],
      isOpen: true,
    },
    { id: 2, name: 'Folder 2', files: [], isOpen: true },
  ])

  const [files, setFiles] = useState([
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' },
  ])

  const handleDropToFolder = (droppedFile, folderId) => {
    // Добавляем файл в папку
    console.log(droppedFile, folderId)
    console.log(
      folders.map((folder) => {
        return folder.id === folderId
          ? // !folder.files.find((file) => file.id === droppedFile.file.id)
            { ...folder, files: [...folder.files, droppedFile.file] }
          : folder
      }),
    )

    setFolders((prevFolders) => {
      prevFolders.map((folder) => {
        return folder.id === folderId
          ? // !folder.files.find((file) => file.id === droppedFile.file.id)
            { ...folder, files: [...folder.files, droppedFile.file] }
          : folder
      })
    })
    // Удаляем файл из общего списка, если он там есть
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== droppedFile.id),
    )
  }

  const handleDropToFiles = (droppedFile) => {
    // Добавляем файл обратно в общий список, если он был перемещен
    if (!files.find((file) => file.id === droppedFile.id)) {
      setFiles((prevFiles) => [...prevFiles, droppedFile])
    }
    // Удаляем файл из его папки
    setFolders((prevFolders) =>
      prevFolders?.map((folder) => ({
        ...folder,
        files: folder.files.filter((file) => file.id !== droppedFile.id),
      })),
    )
  }

  const FilesDropZone = ({ onDrop, folders }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'file',
      drop: (item, monitor) => {
        onDrop(item.file) // Убедитесь, что функция onDrop обрабатывает логику правильно
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
          border: '1px dashed gray',
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

  return (
    <DndProvider backend={HTML5Backend}>
      <FilesFoldersTable
        setFolders={setFolders}
        folders={folders}
        files={files}
        onDropToFolder={handleDropToFolder}
        onDropToFiles={handleDropToFiles}
      />
      <Container>
        <Section>
          <FilesDropZone onDrop={handleDropToFiles} folders={folders} />
        </Section>
      </Container>
    </DndProvider>
  )
}

export default FilesFoldersDnd
