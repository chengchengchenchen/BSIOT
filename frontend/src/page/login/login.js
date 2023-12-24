import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log('Received values:', values);
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/home')
      } else {
        console.error('Login failed:', response.statusText);
        console.log('error:', response.json());
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  }

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
