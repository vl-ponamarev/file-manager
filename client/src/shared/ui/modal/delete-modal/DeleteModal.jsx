import { Modal } from 'antd';
import { FilesContext } from 'index';
import React, { useContext } from 'react';

const DeleteModal = props => {
  const { filesStore } = useContext(FilesContext);

  return (
    <Modal
      title="Are you sure to delete?"
      open={props.selectedMenuActionInfo.action === 'delete'}
      onOk={() => {
        props.handleDeleteOk(
          props.setSelectedMenuActionInfo,
          filesStore,
          props.selectedMenuActionInfo,
        );
        filesStore.setSelectedRowKeysStore([]);
      }}
      onCancel={() =>
        props.setSelectedMenuActionInfo(prev => {
          return { ...prev, action: '' };
        })
      }
    />
  );
};

export default DeleteModal;
