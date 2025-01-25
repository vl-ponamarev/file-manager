import { useContext } from 'react';
import { FilesContext } from 'index';

export const useDownload = () => {
  const { filesStore } = useContext(FilesContext);

  const downloadFiles = async selectedFilesAndFolders => {
    try {
      const response = await filesStore.downloadData(selectedFilesAndFolders);

      if (response.status === 200 && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloaded-file.zip';

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
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return downloadFiles;
};
