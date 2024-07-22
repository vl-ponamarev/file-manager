import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FolderOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { FilesContext } from 'index'
import './DataMenu.css'
import DropdownMenu from './ui/DropdownMenu'

const DataMenu = () => {
  const { filesStore } = useContext(FilesContext)
  const [items, setItems] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    filesStore.getFolders()
  }, [])

  useEffect(() => {
    console.log('folders', filesStore.folders)
    if (filesStore.folders) {
      const map = {}
      const roots = []

      // Создаем словарь объектов по их id
      filesStore.folders.forEach((item) => {
        console.log('item', item)
        map[item._id] = { ...item, children: [] }
      })
      console.log('map', map)
      // Заполняем массив children для каждого объекта
      filesStore.folders.forEach((item) => {
        if (item.rootFolderId !== 'null') {
          console.log('map[item.rootFolderId]', map[item.rootFolderId])
          const obj = map[item._id]
          console.log('obj', obj)
          map[item.rootFolderId]?.children.push({
            children: obj.children.length > 0 ? obj.children : null,
            key: obj._id,
            icon: <FolderOutlined />,
            label: (
              <div className="menu-item-wrapper">
                {obj.foldername}
                <div className="menu-item-dropdown">
                  <DropdownMenu
                    handleMenuClick={handleMenuClick}
                    id={item._id}
                  />
                </div>
              </div>
            ),
          })
        } else {
          const obj = map[item._id]
          roots.push({
            children: obj.children.length > 0 ? obj.children : null,
            key: obj._id,
            label: (
              <div className="menu-item-wrapper">
                {obj.foldername}
                <div className="menu-item-dropdown">
                  <DropdownMenu
                    handleMenuClick={handleMenuClick}
                    id={item._id}
                  />
                </div>
              </div>
            ),
            icon: <FolderOutlined />,
          })
        }
      })

      const rootFolder = {
        key: 'root',
        label: 'Files',
        icon: <FolderOutlined />,
        children: roots,
      }

      setItems([rootFolder])

      console.log('roots', roots)
    }
    console.log([filesStore.createdFolder])
    setSelectedKeys([filesStore.createdFolder])
  }, [filesStore.folders])

  const handleMenuClick = (e) => {
    console.log('Clicked menu item key:', e.key)

    e.domEvent.stopPropagation()
    // Здесь вы можете выполнять действия на основе значения e.key
  }

  useEffect(() => {
    if (selectedKeys.length > 0) {
      console.log(selectedKeys)
      const key =
        selectedKeys.length > 1
          ? selectedKeys[selectedKeys.length - 1]
          : selectedKeys[0]
      filesStore.setOpenFolder(key)
    } else {
      filesStore.setOpenFolder([])
    }
  }, [selectedKeys])

  console.log(filesStore.openFolder)

  const onClick = (e) => {
    console.log('click ', e)
    setSelectedKeys([e.key])
  }

  const onOpenChange = (openKeys) => {
    console.log('openKeys', openKeys)
    setSelectedKeys(openKeys)
  }

  const onSelect = (openKeys) => {
    console.log('openKeys', openKeys)
  }

  return (
    <Menu
      onClick={onClick}
      onOpenChange={onOpenChange}
      // onSelect={onSelect}
      // openKeys={[filesStore.openFolder]}
      defaultOpenKeys={['root']}
      style={{
        width: 400,
      }}
      selectedKeys={selectedKeys}
      mode="inline"
      items={items}
      selectable={true}
    />
  )
}
export default observer(DataMenu)
