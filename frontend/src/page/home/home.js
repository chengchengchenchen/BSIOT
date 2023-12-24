import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const Home1 = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      {isMobile ? (
        /* 移动端布局 */
        <p>This is a mobile layout</p>
      ) : (
        /* PC端布局 */
        <p>This is a desktop layout</p>
      )}
    </div>
  );
}

const HomePage = () => {
  return (

    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Home</Link>
      </Menu.Item>
    </Menu>

  );
};


export default HomePage