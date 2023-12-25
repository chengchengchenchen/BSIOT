// DeviceConfigPage.js

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, Button, Table, Space, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './DeviceConfig.css';

const { Sider, Content } = Layout;

const DeviceConfigPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [form] = Form.useForm();
    const [devices, setDevices] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Alert',
            dataIndex: 'alert',
            key: 'alert',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                    <a style={{ color: 'red' }}
                        onClick={() => handleDelete(record.ID)}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/devices');
            const data = await response.json();
            console.log(data)
            setDevices(data);
        } catch (error) {
            console.error('Error fetching devices:', error.message);
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingDevice(record);
        setVisible(true);
    };

    const handleDelete = async (ID) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/devices/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Device deletion successful:', data);
                fetchData();
            } else {
                const errorData = await response.json();
                console.error('Device deletion failed:', errorData || response.statusText);
            }
        } catch (error) {
            console.error('Error during device deletion:', error.message);
        }
    };

    const onFinish = async (values) => {
        try {
            let apiUrl = 'http://127.0.0.1:5000/devices/add';

            if (editingDevice) {
                apiUrl = `http://127.0.0.1:5000/devices/update`;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Device operation successful:', data);

                fetchData();

                setVisible(false);
                setEditingDevice(null);
                form.resetFields();
            } else {
                const errorData = await response.json();
                console.error('Device operation failed:', errorData || response.statusText);
            }
        } catch (error) {
            console.error('Error during device operation:', error.message);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <Layout className="device-config-container">

            {isMobile ? (
                /* 移动端布局 */
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
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
                    <Menu mode="vertical" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" icon=<HomeOutlined />>
                            <Link to="/home">数据统计</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon=<SettingOutlined />>
                            <Link to="/deviceConfig">设备配置</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon=<SearchOutlined />>
                            <Link to="/query">数据查询</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon=<EnvironmentOutlined />>
                            <Link to="/map">设备轨迹</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )}


            <Layout>
                <Content>
                    <Button onClick={() => {
                        setVisible(true);
                        setEditingDevice(null);
                        form.resetFields();
                    }}
                        icon={<PlusOutlined />}
                        style={{ border: 'none' }}>

                    </Button>
                    <Button
                        onClick={fetchData}
                        icon={<ReloadOutlined />}
                        style={{ border: 'none' }}
                    >
                    </Button>
                    <Table dataSource={devices} columns={columns} rowKey="ID" />
                    <Modal
                        title={`${editingDevice ? '编辑' : '创建'}设备`}
                        open={visible}
                        onOk={form.submit}
                        onCancel={() => {
                            setVisible(false);
                            setEditingDevice(null);
                            form.resetFields();
                        }}
                    >
                        <Form key={editingDevice ? 'edit' : 'create'} form={form} onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                            <Form.Item name="ID" label="ID" rules={[{ required: true }]}>
                                <Input disabled={editingDevice !== null} />
                            </Form.Item>
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="Type">
                                <Input />
                            </Form.Item>
                            <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item name="alert" label="Alert" rules={[{ required: true }]}>
                                <Input type="number" />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DeviceConfigPage;