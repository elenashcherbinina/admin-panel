import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, Row, Col, notification } from 'antd';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Loading from 'components/shared-components/Loading';

const EditProfile = (props) => {
  const { user } = props.location.state;
  const history = useHistory();

  const initState = {
    name: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
    city: user.address.city,
    company: user.company.name,
  };

  const [currentUser, setCurrentUser] = useState(initState);
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentUser({
        name: values.name,
        email: values.email,
        username: values.username,
        phone: values.phone,
        city: values.city,
        company: values.company,
      });
      setLoading(false);
      notification.success({
        message: 'Your profile has been updated',
      });
    }, 1000);

    history.push(`/app/clients/user-list`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {loading && <Loading />}
      <div className='mt-4'>
        <Form
          name='basicInformation'
          {...layout}
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
            username: currentUser.username,
            phone: currentUser.phone,
            city: currentUser.city,
            company: currentUser.company,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Phone Number' name='phone'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='City' name='city'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Company' name='company'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type='primary' htmlType='submit'>
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
