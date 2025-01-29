import { Menu, Space } from 'antd';
import {
  EditOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { handleMenuClick } from 'shared/lib';

const DataAdditionalMenu = (
  id,
  setSelectedMenuActionInfo,
  type,
  setOpen = () => {},
  isRenameButton,
) => {

  return (
    <Menu>
      {isRenameButton && (
        <Menu.Item
          key={`${id} rename ${type}`}
          onClick={e => {
            handleMenuClick(e, setSelectedMenuActionInfo, setOpen);
          }}
        >
          <Space>
            <EditOutlined />
            <span>Rename</span>
          </Space>
        </Menu.Item>
      )}
      <Menu.Item
        key={`${id} move ${type}`}
        onClick={e => {
          handleMenuClick(e, setSelectedMenuActionInfo, setOpen);
        }}
      >
        <Space>
          <ArrowRightOutlined />
          <span> Move to</span>
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`${id} copy ${type}`}
        onClick={e => {
          handleMenuClick(e, setSelectedMenuActionInfo, setOpen);
        }}
      >
        <Space>
          <CopyOutlined />
          <span> Copy to </span>
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`${id} download ${type} `}
        onClick={e => {
          handleMenuClick(e, setSelectedMenuActionInfo);
        }}
      >
        <Space>
          <DownloadOutlined />
          <span> Download</span>
        </Space>
      </Menu.Item>
      <Menu.Item
        key={`${id} delete ${type} `}
        onClick={e => {
          handleMenuClick(e, setSelectedMenuActionInfo);
        }}
      >
        <Space>
          <DeleteOutlined />
          <span> Delete</span>
        </Space>
      </Menu.Item>
    </Menu>
  );
};

export default DataAdditionalMenu;
