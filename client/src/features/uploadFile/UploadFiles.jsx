import React from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { UserContext, FilesContext } from 'index'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const UploadFileAntd = () => {
  const { userStore } = React.useContext(UserContext)
  const { filesStore } = React.useContext(FilesContext)

  const [files, setFiles] = React.useState(null)
  const fileInputRef = React.useRef(null)

  const handleFileChange = (event) => {
    console.log(event.target)
    setFiles(event.target.files) // Uncomment this line
  }

  const handleClick = () => {
    // Programmatically click the hidden file input element
    // when the Button is clicked
    fileInputRef.current.click()
  }

  console.log(filesStore.openFolder)

  useEffect(() => {
    const handleSave = async () => {
      if (files && files.length > 0) {
        const fileFolder = filesStore.openFolder
        console.log('fileFolder', fileFolder)
        const formData = new FormData()
        formData.append('owner', userStore.user.id)
        formData.append('folder', fileFolder)
        for (let i = 0; i < files.length; i++) {
          formData.append('mediacontent', files[i])
        }

        try {
          const response = await filesStore.saveFiles(formData)
          console.log(response.data)
          // filesStore.getFiles() // This line can be uncommented if you want to refresh the files list
        } catch (error) {
          console.error('Error uploading files:', error)
        }
      }
    }
    handleSave()
    filesStore.getFiles()
  }, [files, userStore.user.id])

  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<CloudUploadOutlined />}
        onClick={handleClick}
      >
        UPLOAD FILES
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{
          display: 'none', // Hide the input element
        }}
        onChange={handleFileChange}
      />
    </>
  )
}

export default observer(UploadFileAntd)
