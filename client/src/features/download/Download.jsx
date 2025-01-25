import { Button } from 'antd';
import React from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { FilesContext } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useDownload } from 'shared/hooks/useDownload';

const Download = ({ menuType }) => {
  const { filesStore } = useContext(FilesContext);
  const selectedKeys = filesStore.selectedRowKeysStore;
  const selectedFilesAndFolders = selectedKeys?.reduce(
    (acc, item) => {
      const currentItem = filesStore.files.find(file => file._id === item);
      if (currentItem) {
        acc.files.push(item);
      } else {
        acc.folders.push(item);
      }
      return acc;
    },
    { files: [], folders: [] },
  );
  console.log('ok');

  console.log(selectedFilesAndFolders);

  const downloadFiles = useDownload();
  const handleClick = () => {
    downloadFiles(selectedFilesAndFolders);
  };

  menuType && handleClick();

  const onClick = async () => {
    try {
      const response = await filesStore.downloadData(selectedFilesAndFolders);

      if (response.status === 200 && response.data) {
        // Создание ссылки для скачивания файла
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloaded-file.zip';

        // Извлекаем имя файла из заголовка Content-Disposition
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match && match[1]) {
            fileName = decodeURIComponent(match[1]);
          }
        }

        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        // Очищаем ссылку после скачивания
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return menuType ? null : (
    <Button
      style={{
        backgroundColor: '#1976d2',
        borderColor: '#1976d2',
        color: 'white',
      }}
      icon={<CloudDownloadOutlined />}
      onClick={handleClick}
    >
      DOWNLOAD
    </Button>
  );
};

export default observer(Download);
