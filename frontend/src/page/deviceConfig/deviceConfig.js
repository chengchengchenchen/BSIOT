// DeviceConfigPage.js

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, Button, Table, Space, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { EditOutlined, DeleteOutlined, ToolOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
            title: 'Device ID',
            dataIndex: 'clientId',
            key: 'clientId',
        },
        {
            title: 'Device Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Device Type',
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
                    <a onClick={() => handleEdit(record)}><EditOutlined/></a>
                    <a style={{ color: 'red' }}
                        onClick={() => handleDelete(record.clientId)}><DeleteOutlined/></a>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingDevice(record);
        setVisible(true);
    };

    const handleDelete = (clientId) => {
        // Implement delete logic, e.g., send a request to the server
        // After successful deletion, update the devices state
    };

    const onFinish = (values) => {
        // Implement create or update logic, e.g., send a request to the server
        // After successful creation or update, update the devices state
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
                //TODO:
                /* 移动端布局 */
                <p>This is a mobile layout</p>
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

            <Layout>
                <Content>
                    <Button type="primary" onClick={() => {
                        setVisible(true);
                        setEditingDevice(null); // Clear editing state
                        form.resetFields(); // Clear form fields
                    }}>
                        创建设备
                    </Button>
                    <Table dataSource={devices} columns={columns} rowKey="clientId" />
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
                        <Form key={editingDevice ? 'edit' : 'create'} form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Form.Item name="clientId" label="Device ID" rules={[{ required: true }]}>
                                <Input disabled={editingDevice !== null} />
                            </Form.Item>
                            <Form.Item name="name" label="Device Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="Device Type">
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
