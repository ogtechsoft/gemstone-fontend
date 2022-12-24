import { AppstoreOutlined, UserAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = ({ collapsed, setCollapsed }) => {
  const menuItems = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <UserAddOutlined />,
      label: "Add Customized Certificate",
      path: "/add-certificate",
    },
    {
      key: "3",
      icon: <UserAddOutlined />,
      label: "Add GemStone Certificate",
      path: "/add-gem-certificate",
    },
  ];

  return (
    <Fragment>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          if (type === "responsive") {
            setCollapsed(collapsed);
          }
        }}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          {menuItems.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <span>{item.label}</span>
                <Link to={item.path} />
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
