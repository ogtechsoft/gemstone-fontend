import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import bigLogo from '../../assets/images/ngl_logo_big.png'

const { Header } = Layout;


const TopBar = ({collapsed, setCollapsed}) => {
  const navigate = useNavigate();
   const logout = () => {
      localStorage.clear()
      navigate('/admin')
    }


  return (
    <Fragment>
      <Header
          className={`site-layout-background fixed-header`}>
            <div className='logo_toggle'>
              <div className='logo'>
                <Link to="/dashboard">
                  <img src={bigLogo} alt='logo-big' className='logo_big' />
                </Link>
              </div>
              <div className='sidebar_toggle'>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
              </div>
            </div>
            <div className='right_nav_menu'>
                <button className='nav_profile' onClick={()=>logout()}><LogoutOutlined /></button>
            </div>
      </Header>


    </Fragment>
  )
}

export default TopBar
