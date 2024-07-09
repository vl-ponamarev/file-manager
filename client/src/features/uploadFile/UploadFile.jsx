import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { UserContext, FilesContext } from 'index'
import { useEffect } from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default function UploadFile() {
  const { userStore } = React.useContext(UserContext)
  const { filesStore } = React.useContext(FilesContext)

  const [files, setFiles] = React.useState(null)

  const handleFileChange = (event) => {
    setFiles(event.target.files)
  }

  console.log(files)

  useEffect(() => {
    const handleSave = async () => {
      if (files) {
        const data = {
          owner: userStore.user.id,
          mediacontent: files,
        }
        await filesStore.saveFiles(data)
      }

      // FilesStore.getFiles()
    }
    handleSave()
  }, [files])

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  )
}
