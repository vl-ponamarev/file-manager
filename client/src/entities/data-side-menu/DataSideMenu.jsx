import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FilesContext } from 'index';
import './DataMenu.css';
import DropdownMenu from './ui/DropdownMenu';
import { handleDeleteOk, handleMenuClick } from 'shared/lib';
import DeleteModal from 'shared/ui/modal/delete-modal/DeleteModal';

const DataSideMenu = () => {
  const { filesStore } = useContext(FilesContext);
  const [items, setItems] = useState([]);
  const [filesIds, setFilesIds] = useState([]);
  const rootKey = filesStore.rootKey;
  const [openStateKeys, setOpenStateKeys] = useState([rootKey]);
  const rootFolder = filesStore.folders.find(item => item.foldername === 'Folders');
  const refOpenKeysLength = useRef(0);
  const refOpenKeys = useRef(null);
  const [action, setAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    filesStore.getFolders();
    filesStore.getFiles();
  }, []);

  useEffect(() => {
    if (filesStore.folders) {
      const map = {};
      const roots = [];

      filesStore.folders.forEach(item => {
        map[item._id] = { ...item, children: [] };
      });

      filesStore.folders.forEach(item => {
        if (item.rootFolderId !== rootFolder?._id) {
          const obj = map[item._id];
          map[item.rootFolderId]?.children.push({
            children: obj.children.length > 0 ? obj.children : null,
            key: obj._id,
            icon: <FolderOutlined />,
            label: (
              <div className="menu-item-wrapper">
                {obj.foldername}
                <div className="menu-item-dropdown">
                  <DropdownMenu
                    handleMenuClick={e => handleMenuClick(e, setAction, setSelectedId)}
                    id={item._id}
                    type={'folder'}
                  />
                </div>
              </div>
            ),
          });
        } else {
          const obj = map[item._id];
          roots.push({
            children: obj.children.length > 0 ? obj.children : null,
            key: obj._id,
            label: (
              <div className="menu-item-wrapper">
                {obj.foldername}
                <div className="menu-item-dropdown">
                  <DropdownMenu
                    handleMenuClick={e => handleMenuClick(e, setAction, setSelectedId)}
                    id={item._id}
                    type={'folder'}
                  />
                </div>
              </div>
            ),
            icon: <FolderOutlined />,
          });
        }
      });

      const files = filesStore.files.map(item => {
        if (item.folderId === rootFolder?._id) {
          return {
            key: item._id,
            label: (
              <div className="menu-item-wrapper">
                {item.originalname}
                <div className="menu-item-dropdown">
                  <DropdownMenu
                    handleMenuClick={e => handleMenuClick(e, setAction, setSelectedId)}
                    id={item._id}
                    type={'file'}
                  />
                </div>
              </div>
            ),
            icon: <FileOutlined />,
          };
        }
      });

      const filesId = filesStore.files.map(item => item._id);

      setFilesIds(filesId);

      const rootWithFiles = [...roots, ...files];

      const rootFolderPrepared = {
        key: rootFolder?._id,
        label: rootFolder?.foldername,
        icon: <FolderOutlined />,
        children: rootWithFiles,
      };

      setItems([rootFolderPrepared]);
      filesStore.setDataTree([{ ...rootFolderPrepared, children: [...roots] }]);
      if (filesStore.saveOpenKeys.status) {
        setOpenStateKeys(refOpenKeys.current);
        filesStore.setOpenFolder(filesStore.saveOpenKeys.folderId);
        filesStore.setSaveOpenKeys({
          status: false,
          folderId: null,
        });
      }
    }
  }, [filesStore.folders, filesStore.files]);

  useEffect(() => {
    if (filesStore?.selectedKeys?.length === 0) {
      filesStore.setOpenFolder(rootKey);
    }
  }, [filesStore.selectedKeys]);

  useEffect(() => {
    const parentFolders = [];
    const getParentFolderId = (data, id) => {
      const foundItem = data?.find(item => item._id === id);
      if (foundItem) {
        return foundItem.rootFolderId;
      }
      return null;
    };
    const getParentFolderIds = (data, id) => {
      const folder = getParentFolderId(data, id);
      if (folder) {
        parentFolders.push(folder);
        getParentFolderIds(data, folder);
      }
    };
    getParentFolderIds(filesStore.folders, filesStore.openFolder);

    const result = parentFolders.filter(folder => folder !== 'null');
    if (result.length > 0) {
      setOpenStateKeys([filesStore.openFolder, ...result]);
      filesStore.setOpenFolderParentsList(result);
    }
  }, [filesStore.openFolder]);

  const onOpenChange = openKeys => {
    if (openKeys.length >= refOpenKeysLength.current) {
      filesStore.setOpenFolder(openKeys[openKeys.length - 1]);
      filesStore.setSelectedKeys(openKeys);
      refOpenKeysLength.current = openKeys.length;
      refOpenKeys.current = openKeys;
      setOpenStateKeys(openKeys);
    } else if (openKeys.length < refOpenKeysLength.current) {
      let deselectedFolder;
      refOpenKeys.current.forEach(key => {
        if (!openKeys.includes(key)) {
          deselectedFolder = key;
        }
      });
      if (deselectedFolder !== rootKey) {
        const { rootFolderId, _id } = filesStore.folders.find(
          item => item._id === deselectedFolder,
        );

        const childFolders = [];

        const getChildFolderId = (data, id) => {
          return data.find(item => item.rootFolderId === id);
        };
        const getChildFolderIds = (data, id) => {
          const folder = getChildFolderId(data, id);
          if (folder) {
            childFolders.push(folder._id);
            getChildFolderIds(data, folder._id);
          }
        };
        getChildFolderIds(filesStore.folders, _id);

        if (childFolders.length > 0) {
          const newOpenStateKeys = [...openStateKeys]
            .filter(key => key !== deselectedFolder)
            .reduce((array, current) => {
              if (!childFolders.includes(current)) {
                return [...array, current];
              }
              return array;
            }, []);
          setOpenStateKeys(newOpenStateKeys);
          refOpenKeysLength.current = newOpenStateKeys.length;
          refOpenKeys.current = newOpenStateKeys;
        }

        filesStore.setOpenFolder(rootFolderId);
      } else {
        setOpenStateKeys([rootKey]);
        filesStore.setOpenFolder(rootKey);
        refOpenKeysLength.current = 0;
        refOpenKeys.current = null;
      }
    }
  };
  const onSelect = openKeys => {
    if (filesIds.includes(openKeys.key)) return;
    filesStore.setOpenFolder(openKeys.key);
    refOpenKeys.current = openKeys.keyPath;
    refOpenKeysLength.current = openKeys.keyPath.length;
  };

  const onDeselect = openKeys => {
    if (openKeys.key !== rootKey) {
      const { rootFolderId } = filesStore.folders.find(item => item._id === openKeys.key);
      filesStore.setOpenFolder(rootFolderId);
      refOpenKeys.current = openKeys.keyPath.filter(key => key !== openKeys.key);
      refOpenKeysLength.current = refOpenKeys.current.length;
    }
  };

  return (
    <>
      <Menu
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        onDeselect={onDeselect}
        openKeys={openStateKeys}
        defaultOpenKeys={[rootKey]}
        style={{
          width: 400,
        }}
        selectedKeys={[filesStore.openFolder] ?? [rootKey]}
        mode="inline"
        items={items}
        selectable={true}
        danger={true}
      />
      {action === 'delete' && (
        <DeleteModal
          action={action}
          handleDeleteOk={handleDeleteOk}
          setAction={setAction}
          selectedId={selectedId}
        />
      )}
    </>
  );
};
export default observer(DataSideMenu);
