import React from 'react';
import { Drawer, Divider } from 'antd';
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  CompassOutlined,
} from '@ant-design/icons';

const UserView = ({ data, visible, close }) => {
  return (
    <Drawer width={300} placement='right' onClose={close} open={visible}>
      <div className='text-center mt-3'>
        <h3 className='mt-2 mb-0'>{data?.name}</h3>
        <span className='text-muted'>{data?.username}</span>
      </div>
      <Divider dashed />
      <div className=''>
        <h6 className='text-muted text-uppercase mb-3'>Account details</h6>
        <p>
          <UserOutlined />
          <span className='ml-3 text-dark'>id: {data?.id}</span>
        </p>
        <p>
          <CompassOutlined />
          <span className='ml-3 text-dark'>lives in {data?.address.city}</span>
        </p>
      </div>
      <div className='mt-5'>
        <h6 className='text-muted text-uppercase mb-3'>CONTACT</h6>
        <p>
          <MobileOutlined />
          <span className='ml-3 text-dark'>{data?.phone}</span>
        </p>
        <p>
          <MailOutlined />
          <span className='ml-3 text-dark'>
            {data?.email ? data?.email : '-'}
          </span>
        </p>
      </div>
    </Drawer>
  );
};

export default UserView;
