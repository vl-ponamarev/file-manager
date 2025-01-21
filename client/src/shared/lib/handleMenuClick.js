const handleMenuClick = (e, setSelectedMenuActionInfo = () => {}, setOpen = () => {}) => {
  const [id, action, type] = e.key.split(' ');

  setSelectedMenuActionInfo(prev => ({ ...prev, id, action, type }));
  setOpen(true);
  e.domEvent.stopPropagation();
};

export default handleMenuClick;
