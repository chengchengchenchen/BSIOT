import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';


const { Sider, Content } = Layout;

const HomePage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const items = [
    { key: '1', icon: <HomeOutlined />, label: <Link to="/home">{isMobile ? null : '数据统计'}</Link> },
    { key: '2', icon: <SettingOutlined />, label: <Link to="/deviceConfig">{isMobile ? null : '设备配置'}</Link> },
    { key: '3', icon: <SearchOutlined />, label: <Link to="/search">{isMobile ? null : '数据查询'}</Link> },
    { key: '4', icon: <EnvironmentOutlined />, label: <Link to="/map">{isMobile ? null : '设备轨迹'}</Link> },
  ];

  const [deviceStatistics, setDeviceStatistics] = useState({ total: 0, online: 0, alert: 0 });
  const [deviceData, setDeviceData] = useState([]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/device/statistics');

      if (response.ok) {
        const data = await response.json();
        setDeviceStatistics(data);
      } else {
        const errorData = await response.json();
        console.error('Fetch device statistics failed:', errorData || response.statusText);
      }
    } catch (error) {
      console.error('Error fetching device statistics:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/device/data');
      if (response.ok) {
        const data = await response.json();
        setDeviceData(data);
      } else {
        const errorData = await response.json();
        console.error('Fetch device data failed:', errorData || response.statusText);
      }
    } catch (error) {
      console.error('Error fetching device data:', error.message);
    }
  };

  useEffect(() => {
    setTimeout(fetchData, 500);
    fetchStatistics();
  }, []);

  const option1 = {
    title: {
      text: '设备统计',
    },
    tooltip: {},
    xAxis: {
      data: ['设备总数', '在线设备数', '告警设备数'],
    },
    yAxis: {},
    series: [
      {
        name: '数量',
        type: 'bar',
        data: [deviceStatistics.total, deviceStatistics.online, deviceStatistics.alert],
      },
    ],
  };

  const option2 = {
    title: {
      text: '设备数据量统计',
    },
    tooltip: {},
    xAxis: {
      data: deviceData.map((device) => device.name),
    },
    yAxis: {},
    series: [
      {
        name: '数据量',
        type: 'bar',
        data: deviceData.map((device) => device.value),
      },
    ],
  };

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
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Card>
            <ReactECharts option={option1} theme="light" style={{ height: '300px' }} />
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <ReactECharts option={option2} theme="light" style={{ height: '300px' } } />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}


export default HomePage;