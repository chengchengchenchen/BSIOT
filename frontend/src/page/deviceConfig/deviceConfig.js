// DeviceConfigPage.js

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, Button, Table, Space, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './DeviceConfig.css';

const { Header, Sider, Content } = Layout;

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

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingDevice(record);
        setVisible(true);
    };

    const handleDelete = (ID) => {
        // Implement delete logic, e.g., send a request to the server
        // After successful deletion, update the devices state
    };

    const onFinish = async (values) => {

        // After successful creation or update, update the devices state
        // Implement create or update logic, e.g., send a request to the server
        setVisible(false);
        setEditingDevice(null); // Clear editing state
        form.resetFields(); // Clear form fields



    };

    useEffect(() => {
        // Fetch devices data from the server and update the devices state
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

        fetchData();
    }, []);

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


            <Layout>
                <Content>
                    <Button onClick={() => {
                        setVisible(true);
                        setEditingDevice(null); // Clear editing state
                        form.resetFields(); // Clear form fields
                    }}>
                        <PlusOutlined />
                    </Button>
                    <Table dataSource={devices} columns={columns} rowKey="ID" />
                    <Modal
                        title={`${editingDevice ? '编辑' : '创建'}设备`}
                        open={visible}
                        onOk={form.submit}
                        onCancel={() => {
                            setVisible(false);
                            setEditingDevice(null); // Clear editing state
                            form.resetFields(); // Clear form fields
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

