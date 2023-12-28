import React, { useState, useEffect } from 'react';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined, ReloadOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Layout, Menu, Form, Input, Button, Table, Space, Modal, Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import hangzhou from './hangzhou.json'

const { Sider, Content } = Layout;

const MapPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const items = [
        { key: '1', icon: <HomeOutlined />, label: <Link to="/home">{isMobile ? null : '数据统计'}</Link> },
        { key: '2', icon: <SettingOutlined />, label: <Link to="/deviceConfig">{isMobile ? null : '设备配置'}</Link> },
        { key: '3', icon: <SearchOutlined />, label: <Link to="/search">{isMobile ? null : '数据查询'}</Link> },
        { key: '4', icon: <EnvironmentOutlined />, label: <Link to="/map">{isMobile ? null : '设备轨迹'}</Link> },
    ];
    echarts.registerMap('hangzhou', { geoJSON: hangzhou });

    const [deviceData, setDeviceData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/map');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setDeviceData(data);
            } else {
                const errorData = await response.json();
                console.error('Fetch device data failed:', errorData || response.statusText);
            }
        } catch (error) {
            console.error('Error fetching device data:', error.message);
        }
    };
    useEffect(() => { fetchData(); }, []);


    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (deviceData.length > 0 && initialLoad) {
            setSelectedDevice(deviceData[0].device_id);
            setInitialLoad(false);
        }
    }, [deviceData, initialLoad]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const filteredDeviceData = selectedDevice
        ? deviceData.filter((device) => device.device_id === selectedDevice)
        : [];

    const switchDevice = (direction) => {
        if (deviceData.length === 0) {
            return;
        }

        const currentIndex = deviceData.findIndex((device) => device.device_id === selectedDevice);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % deviceData.length;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + deviceData.length) % deviceData.length;
        }

        setSelectedDevice(deviceData[newIndex].device_id);
    };

    const seriesData = filteredDeviceData.map((device) => ({
        name: device.device_id.toString(),
        type: 'lines',
        coordinateSystem: 'geo',
        polyline: true,
        data: device.locations.map((location, index) => {
            if (index === device.locations.length - 1) {
                return;
            }
            return {
                coords: [
                    [device.locations[index + 1].lng, device.locations[index + 1].lat],
                    [location.lng, location.lat],
                ],
            };
        }).filter(Boolean),
        silent: true,
        lineStyle: {
            color: device.alert ? 'red' : 'green',
            width: 2,
            type: 'dashed',
        },
        effect: {
            show: true,
            symbol: 'arrow',
            symbolSize: 6,
        },
        progressiveThreshold: 500,
        progressive: 200,
        animation: false,
    }));

    const scatterData = filteredDeviceData.map(device => ({
        name: 'device' + device.device_id.toString(),
        type: 'scatter',
        coordinateSystem: 'geo',
        data: device.locations.map(location => ({
            value: [location.lng, location.lat],
            name: `Device: ${device.device_id.toString()}, Time: ${new Date(location.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Shanghai',
            })}, Location: (${parseFloat(location.lng).toFixed(3)}, ${parseFloat(location.lat).toFixed(3)})`
        })),
        symbolSize: 5,
        itemStyle: {
            color: device.alert ? 'red' : 'green',
        },
    }));

    const option = {
        title: {
            text: '设备轨迹',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}',
        },
        geo: {
            map: 'hangzhou',
            zoom: 1.2,
            roam: true,
        },
        series: [...scatterData, ...seriesData],
    };

    return (
        <Layout>
            {isMobile ? (
                /* 移动端布局 */
                <Menu mode="horizontal" defaultSelectedKeys={['4']} items={items}></Menu>
            ) : (
                /* PC端布局 */
                <Sider theme="light" width={200}>
                    <div className="logo" style={{ fontSize: '24px', color: '#87CEFA' }}><UnorderedListOutlined /></div>
                    <Menu mode="vertical" defaultSelectedKeys={['4']} items={items}></Menu>
                </Sider>
            )}
            <Layout >
                <Content style={{ padding: '24px' }}>
                    <Button
                        onClick={() => switchDevice('prev')}
                        icon=<ArrowLeftOutlined />
                        style={{ border: 'none' }}>
                    </Button>
                    <Button
                        onClick={() => switchDevice('next')}
                        icon=<ArrowRightOutlined />
                        style={{ border: 'none' }}>
                    </Button>
                    <Button
                        onClick={fetchData}
                        icon=<ReloadOutlined />
                        style={{ border: 'none' }}
                    >
                    </Button>
                    <Card>
                        <ReactECharts option={option} style={{ height: isMobile ? '300px' : '600px' }} />
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
}


export default MapPage;