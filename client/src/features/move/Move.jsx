import { Button } from 'antd'
import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons';
import { FilesContext } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import MoveToCopyToModal from 'entities/folder/ui/MoveToCopyToModal';

const Move = () => {
  const { filesStore } = useContext(FilesContext);
  const [open, setOpen] = useState(false);
  const selectedKeys = filesStore.selectedRowKeysStore;

  console.log(selectedKeys);

  const onClick = () => {
    setOpen(true);
  };

  const modalData = {
    method: 'move',
    dataToMove: selectedKeys,
  };

  console.log(modalData);

  return (
    <>
      <Button
        style={{
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          color: 'white',
        }}
        icon={<ArrowRightOutlined />}
        onClick={onClick}
      >
        MOVE TO
      </Button>
      {open && <MoveToCopyToModal open={open} setOpen={setOpen} data={modalData} />}
    </>
  );
};

export default observer(Move);
