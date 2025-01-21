import { Button, Popconfirm } from 'antd'
import React, { useContext } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { FilesContext } from 'index'
import { observer } from 'mobx-react-lite'
import { handleDelete } from 'shared/lib';

const Delete = ({ selectedFolder = undefined }) => {
  const { filesStore } = useContext(FilesContext);
  const onClick = () => {
    handleDelete(selectedFolder ? (filesStore, selectedFolder) : filesStore);
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this item?"
      onConfirm={onClick}
      style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 100 }}
    >
      {!selectedFolder && (
        <Button
          style={{
            backgroundColor: '#1976d2',
            borderColor: '#1976d2',
            color: 'white',
          }}
          icon={<DeleteOutlined />}
        >
          DELETE
        </Button>
      )}
    </Popconfirm>
  );
};

export default observer(Delete)
