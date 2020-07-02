import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const LayoutPage = ({ children }) => {
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo">
        CM Estoque
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/product">
            Produto
          </Link>
        </Menu.Item>
        
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 520 }}>
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>CM Estoque 2020 - Challenge</Footer>
  </Layout>
  )
}

export default LayoutPage