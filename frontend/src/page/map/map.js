import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';


const { Header, Sider, Content } = Layout;

const MapPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Layout>
            {isMobile ? (
        /* 移动端布局 */
        <Menu mode="horizontal" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Link to="/home"><HomeOutlined /></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/deviceConfig"><SettingOutlined /></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/query"><SearchOutlined /></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/map"><EnvironmentOutlined /></Link>
          </Menu.Item>
        </Menu>
      ) : (
        /* PC端布局 */
        <Sider theme="light" width={200}>
          <div className="logo" style={{ fontSize: '24px', color: '#87CEFA' }}><UnorderedListOutlined /></div>
          <Menu mode="vertical" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to="/home"><HomeOutlined /> 数据统计</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/deviceConfig"><SettingOutlined /> 设备配置</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/query"><SearchOutlined /> 数据查询</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/map"><EnvironmentOutlined /> 设备轨迹</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
        </Layout>
    );
}


export default MapPage;