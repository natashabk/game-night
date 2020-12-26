import React, { useContext } from 'react';
import { Layout, Typography, } from 'antd';
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const noBg = { background: 'none' }
const titleStyle = { color: 'white', textAlign: 'center', maxWidth: 1300 }

const TopHeader = ( { err } ) => {
  return (
    <Header style={noBg}>
      <Title level={1} style={titleStyle}>GAME NIGHT</Title>
      {err ? <Text>{err.type}: {err.error}</Text> : null}
    </Header>
  )
}
export default TopHeader;