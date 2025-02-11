import React, { useContext, useRef, useState } from 'react'
import { Input, Modal } from 'antd'
import Draggable from 'react-draggable'
import { observer } from 'mobx-react-lite'
import { FilesContext } from 'index'
const EditNameModal = ({
  open,
  setOpen,
  method,
  dataToRename,
  setSelectedMenuActionInfo = () => {},
}) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const { filesStore } = useContext(FilesContext);
  const date = new Date();
  const dataType = dataToRename?.type;
  const { name } = dataToRename ? dataToRename : { type: null, id: null, name: null };
  const [value, setValue] = useState(method === 'create' ? '' : name);

  const draggleRef = useRef(null);

  const handleOk = e => {
    if (method === 'create' && value !== '') {
      filesStore.createFolder({
        foldername: value,
        rootFolderId: filesStore.openFolder,
        creationDate: date,
      });
      setSelectedMenuActionInfo(prev => {
        return { ...prev, action: '' };
      });
      setOpen(false);
      return;
    } else {
      if (dataToRename && value !== '') {
        filesStore.editName(dataToRename, value);
      }
      setSelectedMenuActionInfo(prev => {
        return { ...prev, action: '' };
      });
      setOpen(false);
      return;
    }
  };
  const handleCancel = e => {
    setSelectedMenuActionInfo(prev => {
      return { ...prev, action: '' };
    });
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {method === 'create'
              ? `Enter Folder Name`
              : dataType === 'file'
              ? `Edit File Name`
              : `Edit Folder Name`}
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Input
          placeholder={method === 'create' ? `Folder-name` : name}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default observer(EditNameModal)
