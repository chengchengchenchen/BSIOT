import React from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    // 处理登录逻辑
    console.log('Received values:', values);
  };

  return (
    <div className="login-container" style={{ background: 'linear-gradient(-45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%)' }}>
      <div className="login-form">
        <Title level={2}>IOT 网站登录</Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Link to="/register">现在注册!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
