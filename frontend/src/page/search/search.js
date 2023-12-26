import React, { useState } from 'react';
import { Form, Input, Button, Layout, Table } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


const { Sider, Content } = Layout;

const SearchPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const items = [
        { key: '1', icon: <HomeOutlined />, label: <Link to="/home">{isMobile ? null : '数据统计'}</Link> },
        { key: '2', icon: <SettingOutlined />, label: <Link to="/deviceConfig">{isMobile ? null : '设备配置'}</Link> },
        { key: '3', icon: <SearchOutlined />, label: <Link to="/search">{isMobile ? null : '数据查询'}</Link> },
        { key: '4', icon: <EnvironmentOutlined />, label: <Link to="/map">{isMobile ? null : '设备轨迹'}</Link> },
    ];
    const [form] = Form.useForm();
    const [messages, setMessages] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Info',
            dataIndex: 'info',
            key: 'info',
        },
        {
            title: 'Lng',
            dataIndex: 'lng',
            key: 'lng',
            render: (text) => parseFloat(text).toFixed(3),
        },
        {
            title: 'Lat',
            dataIndex: 'lat',
            key: 'lat',
            render: (text) => parseFloat(text).toFixed(3),
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => {
                const timestamp = new Date(text);
                const formattedTimestamp = timestamp.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                    timeZone: 'Asia/Shanghai',
                });
                return formattedTimestamp;
            },
        },
    ];

    const onFinish = async (values) => {
        try {
            console.log(values)
            const response = await fetch('http://127.0.0.1:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                const errorData = await response.json();
                console.error('Fetch failed:', errorData || response.statusText);
            }
            
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    return (
        <Layout>
            {isMobile ? (
                /* 移动端布局 */
                <Menu mode="horizontal" defaultSelectedKeys={['3']} items={items}></Menu>
            ) : (
                /* PC端布局 */
                <Sider theme="light" width={200}>
                    <div className="logo" style={{ fontSize: '24px', color: '#87CEFA' }}><UnorderedListOutlined /></div>
                    <Menu mode="vertical" defaultSelectedKeys={['3']} items={items}></Menu>
                </Sider>
            )}
            <Layout style={{ padding: '5px' }}>
                <Content  style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Form form={form} onFinish={onFinish} style={{ padding: '5px' }}>
                        <Form.Item name="ID" rules={[{ required: true}]}>
                            <Input
                                placeholder="Input device ID:"
                                suffix={<Button icon={<SearchOutlined/>} style={{ border: 'none' }} htmlType="submit" />}
                            />
                        </Form.Item>
                    </Form>
                    <Table dataSource={messages} columns={columns} rowKey="timestamp" />
                </Content>
            </Layout>
        </Layout>
    );
}


export default SearchPage;