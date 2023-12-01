import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Table, Tooltip, notification, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from 'components/shared-components/Loading';

const API = 'https://jsonplaceholder.typicode.com/users';

const UserList = () => {
  const history = useHistory();
  const initState = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
  };

  const [state, setState] = useState(initState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = false;
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get(API);
        if (!mounted) {
          setState({ ...state, users: data });
          setLoading(setLoading(false));
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
    return () => (mounted = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (userId) => {
    const filtredUsers = state.users.filter((item) => item.id !== userId);
    setState({ ...state, users: filtredUsers });
    notification.success({
      message: `Deleted user ${userId}`,
    });
  };

  const showUserProfile = (userInfo) => {
    setState({ ...state, userProfileVisible: true, selectedUser: userInfo });
  };

  const closeUserProfile = () => {
    setState({ ...state, userProfileVisible: false, selectedUser: null });
  };

  const editUserProfile = (user) => {
    history.push({
      pathname: `${user.id}/edit-profile`,
      state: { user },
    });
  };

  const tableColumns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <div
            className='d-flex'
            style={{ cursor: 'pointer' }}
            onClick={() => editUserProfile(record)}
          >
            <AvatarStatus
              name={record.name}
              subTitle={record.username}
              id={record.id}
            />
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Город',
      dataIndex: 'address',
      key: 'address',
      render: (address) => <span>{address.city}</span>,
      sorter: {
        compare: (a, b) => {
          a = a.address.city.toLowerCase();
          b = b.address.city.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
      render: (company) => <span>{company.name}</span>,
      sorter: {
        compare: (a, b) => {
          a = a.company.name.toLowerCase();
          b = b.company.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Контакты',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => {
          a = a.email.toLowerCase();
          b = b.email.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className='text-right'>
          <Tooltip title='View'>
            <Button
              type='primary'
              className='mr-2'
              icon={<EyeOutlined />}
              onClick={() => {
                showUserProfile(elm);
              }}
              size='small'
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteUser(elm.id);
              }}
              size='small'
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <Card bodyStyle={{ padding: '0px' }}>
        <Table columns={tableColumns} dataSource={state.users} rowKey='id' />
        {state.selectedUser && (
          <UserView
            data={state.selectedUser}
            visible={state.userProfileVisible}
            close={closeUserProfile}
          />
        )}
      </Card>
    </>
  );
};

export default UserList;
