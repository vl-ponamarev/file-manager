import { Button } from 'antd'
import React, { useState } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { FilesContext } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { EditNameModal } from 'entities/folder/ui';

const Rename = () => {
  const { filesStore } = useContext(FilesContext)

  const [open, setOpen] = useState(false)
  const [dataToRename, setDataToRename] = useState(null)

  const onClick = () => {
    const selectedItem = filesStore.selectedRowKeysStore[0];
    if (selectedItem) {
      const file = filesStore.files.find((file) => file._id === selectedItem)
      if (file) {
        setOpen(true);
        setDataToRename({
          type: 'file',
          id: file._id,
          name: file.originalname,
        });
        return;
      } else {
        setOpen(true);
        const folder = filesStore.folders.find(folder => folder._id === selectedItem);
        setDataToRename({
          type: 'folder',
          id: folder._id,
          name: folder.foldername,
        });
        return;
      }
    }
  }
  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<EditOutlined />}
        onClick={onClick}
      >
        RENAME
      </Button>
      {open && (
        <EditNameModal
          open={open}
          setOpen={setOpen}
          method="edit"
          dataToRename={dataToRename}
        />
      )}
    </>
  )
}

export default observer(Rename)
