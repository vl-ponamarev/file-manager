import handleDelete from './handleDelete';

const handleDeleteOk = (setSelectedMenuActionInfo, filesStore, selectedMenuActionInfo) => {
  handleDelete(filesStore, selectedMenuActionInfo.id, selectedMenuActionInfo.type);

  setSelectedMenuActionInfo({
    id: '',
    action: '',
    type: '',
  });
};

export default handleDeleteOk;
