import { Modal } from 'antd';
import { Delete } from 'features';

export const dropDownMenuMethods = new Map([
  [
    'delete',
    id => {
      return <Modal title="Are you sure?" open={id} />;
    },
  ],
]);
