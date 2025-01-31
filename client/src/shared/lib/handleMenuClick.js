const handleMenuClick = (e, setSelectedMenuActionInfo = () => {}, setOpen = () => {}) => {
  const [id, action, type, name] = e?.key?.split(' ');
  setSelectedMenuActionInfo(prev => ({ ...prev, id, action, type, name }));
  setOpen(true);
  e?.domEvent?.stopPropagation();
};

export default handleMenuClick;
