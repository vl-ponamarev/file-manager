import { Button } from 'antd';
import React, { useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { FilesContext } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { MoveToCopyToModal } from 'entities/folder/ui';

const Copy = () => {
  const { filesStore } = useContext(FilesContext);
  const [open, setOpen] = useState(false);
  const selectedKeys = filesStore.selectedRowKeysStore;

  const onClick = () => {
    setOpen(true);
  };

  const modalData = {
    method: 'copy',
    dataToMove: selectedKeys,
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<CopyOutlined />}
        onClick={onClick}
      >
        COPY TO
      </Button>
      {open && <MoveToCopyToModal open={open} setOpen={setOpen} data={modalData} />}
    </>
  );
};

export default observer(Copy);
