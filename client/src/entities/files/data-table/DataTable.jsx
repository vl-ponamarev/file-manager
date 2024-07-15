import React from 'react'

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

const data = [
  { id: 1, name: 'John Brown', age: 32 },
  { id: 2, name: 'Jim Green', age: 40 },
  { id: 3, name: 'Joe Black', age: 38 },
]

const columns = [
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Actions', key: 'actions' },
]

const DataTable = () => {
  const handleDelete = (id) => {
    console.log(id)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
