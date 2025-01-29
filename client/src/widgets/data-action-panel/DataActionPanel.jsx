import { Space } from 'antd';
import { FilesContext } from 'index';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Copy, Delete, Move, Rename, Upload, CreateDir } from 'features';
import Download from 'features/download/Download';

const DataActionPanel = () => {
  const { filesStore } = useContext(FilesContext);
  const openFolder = filesStore.openFolder;
  const selectedRowKeysStore = filesStore.selectedRowKeysStore;
  const addButtons = selectedRowKeysStore.length > 0 && selectedRowKeysStore[0] !== 'back';
  const isRenameButton =
    selectedRowKeysStore.length > 0 &&
    selectedRowKeysStore.length < 2 &&
    selectedRowKeysStore[0] !== 'back';
  return (
    <Space>
      {openFolder && !addButtons && (
        <>
          <CreateDir />
          <Upload />
        </>
      )}
      {addButtons && (
        <>
          <Copy />
          <Move />
          <Download />
          {isRenameButton && <Rename />}
          <Delete />
        </>
      )}
    </Space>
  );
};

export default observer(DataActionPanel);
