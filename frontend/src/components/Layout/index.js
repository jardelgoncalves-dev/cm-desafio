import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import '../../assets/css/main.css';

const { Header, Content, Footer } = Layout;

const LayoutPage = ({ children }) => {
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo">
        CM Estoque
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Produtos</Menu.Item>
        <Menu.Item key="3">Recuperar</Menu.Item>
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