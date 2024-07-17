// import React from 'react'

// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material'
// import { Delete as DeleteIcon } from '@mui/icons-material'

// const data = [
//   { id: 1, name: 'John Brown', age: 32 },
//   { id: 2, name: 'Jim Green', age: 40 },
//   { id: 3, name: 'Joe Black', age: 38 },
// ]

// const columns = [
//   { label: 'Name', key: 'name' },
//   { label: 'Age', key: 'age' },
//   { label: 'Actions', key: 'actions' },
// ]

// const DataTable = () => {
//   const handleDelete = (id) => {
//     console.log(id)
//   }

//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell key={column.key}>{column.label}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.age}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => handleDelete(row.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

// export default DataTable

import React, { useState, useCallback } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const FolderRow = ({
  folder,
  onDrop,
  toggleFilesVisibility,
  handleDropToFiles,
}) => {
  const [, drop] = useDrop({
    accept: 'file',
    drop: (item) => onDrop(item, folder.id),
  })

  return (
    <React.Fragment>
      <TableRow
        ref={drop}
        onClick={() => toggleFilesVisibility(folder.id)}
        style={{
          backgroundColor: 'lightgrey',
          cursor: 'pointer',
          border: '2px dashed gray',
        }}
      >
        <TableCell colSpan={1}>{folder.name}</TableCell>
        <TableCell
          colSpan={6}
        >{`${folder.files.length} file(s) in folder`}</TableCell>
        <TableCell colSpan={1}>
          <DeleteIcon style={{ cursor: 'pointer' }} color="action" />
        </TableCell>
      </TableRow>

      {folder.isOpen &&
        folder.files.map((file) => (
          <FileRow
            key={file.id}
            file={file}
            onFileDrop={handleDropToFiles}
            inFolder={true}
          />
        ))}
    </React.Fragment>
  )
}

const FileRow = ({ file, onFileDrop, inFolder = false }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'file',
    item: { file },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onFileDrop(item.file, dropResult.folderId)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <TableRow
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: inFolder ? '#f0f0f0' : 'antiquewhite',
        width: inFolder ? '100%' : '200px',
      }}
    >
      <TableCell colSpan={1}>{file.name}</TableCell>
      <TableCell colSpan={4}>File details here</TableCell>
      <TableCell colSpan={3}>
        <DeleteIcon style={{ cursor: 'pointer' }} color="disabled" />
      </TableCell>
    </TableRow>
  )
}

const FilesFoldersTable = ({
  folders = [],
  files = [],
  onDropToFolder,
  onDropToFiles,
}) => {
  const [localFolders, setLocalFolders] = useState(
    folders.map((folder) => ({ ...folder, isOpen: false })),
  )

  const handleDropToFolder = useCallback(
    (item, folderId) => {
      console.log(localFolders)
      console.log(item)
      setLocalFolders((folders) =>
        folders.map((folder) =>
          folder.id === folderId
            ? {
                ...folder,
                // Добавляем файл только если он отсутствует в папке
                files: !folder.files.find(
                  (file) => Number(file.id) === Number(item.file.id),
                )
                  ? [...folder.files, item.file]
                  : folder.files,
                // Автоматически открываем папку, если она была закрыта
                isOpen: true,
              }
            : folder,
        ),
      )
    },
    [onDropToFolder],
  )

  const toggleFilesVisibility = useCallback((folderId) => {
    setLocalFolders((folders) =>
      folders.map((folder) =>
        folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder,
      ),
    )
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localFolders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                onDrop={handleDropToFolder}
                toggleFilesVisibility={toggleFilesVisibility}
                handleDropToFiles={onDropToFiles}
              />
            ))}
            {files.map((file) => (
              <FileRow key={file.id} file={file} onFileDrop={onDropToFiles} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  )
}

export default FilesFoldersTable
