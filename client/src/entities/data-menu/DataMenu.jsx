import React, { useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FolderOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { FilesContext } from 'index'
import './DataMenu.css'
import DropdownMenu from './ui/DropdownMenu'

const DataMenu = () => {
  const { filesStore } = useContext(FilesContext)
  const [items, setItems] = useState([])
  // const [selectedKeys, setSelectedKeys] = useState([])

  const rootFolder = filesStore.folders.find(
    (item) => item.foldername === 'Files',
  )

  useEffect(() => {
    filesStore.getFolders()
  }, [])

  console.log('openFolder', filesStore.openFolder)
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
      // const rootFolder = filesStore.folders.find(
      //   (item) => item.foldername === 'Files',
      // )
      filesStore.setOpenFolder(rootFolder?._id)

      filesStore.folders.forEach((item) => {
        if (item.rootFolderId !== rootFolder._id) {
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

      const rootFolderPrepared = {
        key: rootFolder?._id,
        label: rootFolder?.foldername,
        icon: <FolderOutlined />,
        children: roots,
      }

      setItems([rootFolderPrepared])
    }
    // console.log([filesStore.createdFolder])
    // filesStore.setSelectedKeys([filesStore.createdFolder])
  }, [filesStore.folders])

  const handleMenuClick = (e) => {
    console.log('Clicked menu item key:', e.key)

    e.domEvent.stopPropagation()
    // Здесь вы можете выполнять действия на основе значения e.key
  }

  const ref = useRef(filesStore.selectedKeys)

  console.log(ref.current)

  useEffect(() => {
    console.log(filesStore.selectedKeys)
    console.log(filesStore.selectedKeys.length)
    if (filesStore?.selectedKeys?.length === 0) {
      console.log('ok')
      filesStore.setOpenFolder(rootFolder?._id)
    } else if (filesStore?.selectedKeys?.length > 1) {
      console.log('oks')
      filesStore.setOpenFolder(
        filesStore.selectedKeys[filesStore.selectedKeys.length - 1],
      )
    } else {
      console.log('oki')
      filesStore.setOpenFolder(filesStore.selectedKeys[0])
    }
  }, [filesStore.selectedKeys])

  console.log(filesStore.openFolder)
  console.log(filesStore.selectedKeys)

  const onClick = (e) => {
    console.log('click ', e)
    filesStore.setSelectedKeys([e.key])
  }

  const [allOpenKeys, setAllOpenKeys] = useState(['669f6de3daad41e24782120f'])
  console.log(allOpenKeys)

  const onOpenChange = (openKeys) => {
    console.log('openKeys', openKeys)
    openKeys.forEach((item) => {
      if (!allOpenKeys.includes(item)) {
        setAllOpenKeys([item, ...allOpenKeys])
      }
    })
    filesStore.setSelectedKeys(openKeys)
  }
  // const onSelect = (openKeys) => {
  //   console.log('openKeys', openKeys)
  //   filesStore.setOpenFolder(openKeys.key)
  // }

  const onDeselect = (openKeys) => {
    console.log('openKeys', openKeys)
  }

  return (
    <Menu
      onClick={onClick}
      onOpenChange={onOpenChange}
      // onSelect={onSelect}
      onDeselect={onDeselect}
      openKeys={allOpenKeys}
      defaultOpenKeys={['669f6de3daad41e24782120f']}
      style={{
        width: 400,
      }}
      selectedKeys={[filesStore.openFolder] ?? []}
      mode="inline"
      items={items}
      selectable={true}
    />
  )
}
export default observer(DataMenu)
