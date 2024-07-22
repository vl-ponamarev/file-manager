import { MailOutlined, SettingOutlined } from '@ant-design/icons'

export const itemss = [
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        color: 'red',
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
