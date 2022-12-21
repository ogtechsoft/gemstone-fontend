import { Layout } from 'antd'
import React, { useState } from 'react'
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './TopBar'

const { Content } = Layout;

const MainLayout = ({children}) => {

  const [collapsed, setCollapsed] = useState(false);
  // const {pathname} = useLocation()

  return (
    <div>
      <Layout>
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout className="site-layout">
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

          <Layout className={`site-layout-background ${collapsed ? 'w_100' : 'w_270'}`}>
            <Content className="site-layout-background main_layout">
            <div className='dashboard_wrapper'>
              {children}
            </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
