import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';


const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const items = [
    { key: '1', icon: <HomeOutlined />, label: <Link to="/home">{isMobile ? null : '数据统计'}</Link> },
    { key: '2', icon: <SettingOutlined />, label: <Link to="/deviceConfig">{isMobile ? null : '设备配置'}</Link> },
    { key: '3', icon: <SearchOutlined />, label: <Link to="/search">{isMobile ? null : '数据查询'}</Link> },
    { key: '4', icon: <EnvironmentOutlined />, label: <Link to="/map">{isMobile ? null : '设备轨迹'}</Link> },
  ];
  return (
    <Layout>
      {isMobile ? (
        /* 移动端布局 */
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={items}></Menu>
      ) : (
        /* PC端布局 */
        <Sider theme="light" width={200}>
          <div className="logo" style={{ fontSize: '24px', color: '#87CEFA' }}><UnorderedListOutlined /></div>
          <Menu mode="vertical" defaultSelectedKeys={['1']} items={items}></Menu>
        </Sider>
      )}
    </Layout>
  );
}


export default HomePage;