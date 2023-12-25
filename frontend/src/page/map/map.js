import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UserOutlined, LockOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
                <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">设备配置</Menu.Item>
                    {/* Add other page navigation items here */}
                </Menu>
            ) : (
                /* PC端布局 */
                <Sider theme="light" width={200}>
                    <div className="logo" style={{ fontSize: '24px', color: '#87CEFA' }}><UnorderedListOutlined /></div>
                    <Menu mode="vertical" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">设备配置</Menu.Item>
                        {/* Add other page navigation items here */}
                    </Menu>
                </Sider>
            )}
        </Layout>
    );
}


export default MapPage;