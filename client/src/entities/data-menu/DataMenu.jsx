import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { FilesContext } from 'index'
const itemss = [
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
          {
            key: '13',
            label: 'Option 13',
          },
          {
            key: '14',
            label: 'Option 14',
          },
        ],
      },
      {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
          {
            key: '9',
            label: 'Option 9',
          },
          {
            key: '10',
            label: 'Option 10',
          },
          {
            key: '11',
            label: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
          },
        ],
      },
    ],
  },
]
const DataMenu = () => {
  const { filesStore } = useContext(FilesContext)

  const [items, setItems] = useState([])

  console.log('folders', filesStore.folders)

  useEffect(() => {
    filesStore.getFolders()
  }, [])

  useEffect(() => {
    console.log('folders', filesStore.folders)
    const newItemsData = new Map()
    if (filesStore.folders) {
      console.log('folders', filesStore.folders)
      //   filesStore.folders.forEach((folder) => {
      //     const children = filesStore.folders.filter(
      //       (file) => file.rootFolderId === folder._id,
      //     )
      //     if (newItemsData.has(folder._id)) return
      //     newItemsData.set(folder._id, {
      //       key: folder._id,
      //       label: folder.foldername,
      //       icon: <FolderOutlined />,
      //       // type: 'group',
      //       children:
      //         children.length > 0
      //           ? children.map((childFolder) => ({
      //               key: childFolder._id,
      //               label: childFolder.foldername,
      //               icon: <FolderOutlined />,
      //               // type: 'group',
      //             }))
      //           : null,
      //     })
      //   })

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
          map[item.rootFolderId]?.children.push(map[item._id])
        } else {
          roots.push(map[item._id])
        }
      })

      console.log('roots', roots)
    }

    // const valuesArray = Array.from(newItemsData.values())
    // const tree = buildTree(filesStore.folders)
    // setItems(tree)
    // console.log('tree', tree)
  }, [filesStore.folders])

  const buildTree = (data) => {
    const map = {}
    const roots = []

    // Создаем словарь объектов по их id
    data.forEach((item) => {
      console.log('item', item)
      map[item._id] = { ...item, children: [] }
    })
    console.log('map', map)
    // Заполняем массив children для каждого объекта
    data.forEach((item) => {
      if (item.rootFolderId !== 'null') {
        console.log('map[item.rootFolderId]', map[item.rootFolderId])
        map[item.rootFolderId]?.children.push(map[item._id])
      } else {
        roots.push(map[item._id])
      }
    })

    return roots
  }

  const onClick = (e) => {
    console.log('click ', e)
  }

  const onOpenChange = (openKeys) => {
    console.log('openKeys', openKeys)
  }

  const onSelect = (openKeys) => {
    console.log('openKeys', openKeys)
  }

  return (
    <Menu
      onClick={onClick}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      style={{
        width: 256,
      }}
      // defaultSelectedKeys={['1']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      selectable={true}
    />
  )
}
export default observer(DataMenu)
