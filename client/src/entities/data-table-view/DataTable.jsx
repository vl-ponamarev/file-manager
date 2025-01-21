import React, { useContext, useState } from 'react'
import { Table, Dropdown, Flex } from 'antd';
import './DataTable.css';
import { FilesContext } from 'index';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { FolderOutlined, MoreOutlined, FileOutlined, ArrowUpOutlined } from '@ant-design/icons';
import DataAdditionalMenu from 'shared/ui/menu/DataAdditionalMenu';
import { handleDeleteOk } from 'shared/lib';
import DeleteModal from 'shared/ui/modal/delete-modal/DeleteModal';

const DataTable = ({ initialData, setLevelUp, selectedRowKeys, setSelectedRowKeys }) => {
  const { filesStore } = useContext(FilesContext);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [action, setAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        if (record.type === 'folder') {
          return <FolderOutlined />;
        } else if (record.type === 'file') {
          return <FileOutlined />;
        } else if (record.type === 'back') {
          return <ArrowUpOutlined />;
        }
        return null;
      },
      width: '2%',
    },
    {
      title: 'Name',
      dataIndex: 'dataName',
      key: 'dataName',
      sorter: (a, b) => a.dataName.localeCompare(b.dataName),
    },
    {
      title: 'Data Modified',
      dataIndex: 'dataModified',
      key: 'dataModified',
      sorter: (a, b) => (dayjs(a.dataModified).isBefore(dayjs(b.dataModified)) ? -1 : 1),
      width: '20%',
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      sorter: (a, b) => a.fileSize - b.fileSize,
      width: '15%',
    },
    {
      title: 'File Type',
      dataIndex: 'mimetype',
      key: 'mimetype',
      // sorter: (a, b) => a.mimetype.localeCompare(b.mimetype),
      width: '10%',
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        if (record.type === 'folder' || record.type === 'file') {
          return (
            <Dropdown overlay={DataAdditionalMenu(record)} trigger={['click']}>
              <MoreOutlined className="action-button" style={{ fontSize: '20px' }} />
            </Dropdown>
          );
        } else if (record.type === 'back') {
          return null;
        }
      },
      width: '2%',
    },
  ];

  const handleRowContextMenu = (event, record) => {
    const { id } = record;
    event.preventDefault();
    if (selectedRowKeys.length <= 1) {
      setSelectedRowKeys([id]);
      setSelectedRowId(id);
    }

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
            record,
          }
        : null,
    );
  };

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      const newSelectedRowObjects = [...filesStore.selectedRowObjects];
      if (selectedRowKeys.includes(record.id)) {
        filesStore.setSelectedRowObjects(newSelectedRowObjects.filter(obj => obj.id !== record.id));
      } else {
        newSelectedRowObjects.push({ record });
        filesStore.setSelectedRowObjects(newSelectedRowObjects);
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        filesStore.setSelectedRowObjects([...filesStore.selectedRowObjects, ...changeRows]);
      } else {
        filesStore.setSelectedRowObjects([]);
      }
    },
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={initialData}
        rowClassName={(record, index) => {
          return record.id === selectedRowId ? 'selected-row' : '';
        }}
        onRow={(record, index) => {
          return {
            onContextMenu: event => handleRowContextMenu(event, record),
            // onClick: () => {
            //   // const { id } = record
            // },
            onDoubleClick: () => {
              const { id } = record;
              if (id !== 'back' && record.type === 'folder') {
                setSelectedRowKeys([]);
                filesStore.setOpenFolder(id);
                filesStore.setSelectedKeys([id]);
              } else if (record.type === 'file') {
                return;
              } else {
                setLevelUp(prev => !prev);
              }
            },
          };
        }}
      />
      {contextMenu && (
        <Dropdown
          overlay={() =>
            DataAdditionalMenu(
              contextMenu?.record?.id,
              setAction,
              setSelectedId,
              contextMenu?.record?.type,
            )
          }
          trigger={['click']}
          visible
          onVisibleChange={visible => !visible && setContextMenu(null)}
          getPopupContainer={triggerNode => triggerNode.parentNode}
        >
          <div
            style={{
              position: 'absolute',
              top: contextMenu.mouseY,
              left: contextMenu.mouseX,
              zIndex: 10000,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          />
        </Dropdown>
      )}
      {action === 'delete' && (
        <DeleteModal
          action={action}
          handleDeleteOk={handleDeleteOk}
          setAction={setAction}
          selectedId={selectedId}
        />
      )}
    </Flex>
  );
};

export default observer(DataTable)
