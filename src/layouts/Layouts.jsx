// src/components/Layout.jsx
import React, { useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/add-employee">Add Employee</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/view-employee">View Employees</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/view-KPI">View KPI</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link to="/skill">Skill Info</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UploadOutlined />}>
            <Link to="/team">Team</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UploadOutlined />}>
            <Link to="/complexity">Complexity</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<UploadOutlined />}>
            <Link to="/risk-type">Risk Type</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
