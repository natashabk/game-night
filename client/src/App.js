import React, { useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Layout, Typography, } from 'antd';
import SignIn from './Login'
import Chat from './Chat'
import './App.css';
import { WebSocketProvider, store, WebSocketContext } from './utils';
import Scattergories from './Scattergories/Scattergories';
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const titleStyle = { color: 'white', textAlign: 'center', maxWidth: 1300 }

const App = () => {
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const ws = useContext( WebSocketContext );

  if ( !room || !username ) return <SignIn />
  else ws.addPlayer( room.id, username );

  return (
    <Layout>
      <Sider theme="light" style={{ background: 'none', marginTop: 30 }}>

      </Sider>
      <Content style={{ padding: 30, background: 'none' }}>
        <Scattergories />
      </Content>
      <Sider theme="light" width={400}>
        <Chat />
      </Sider>
    </Layout>
  )
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <Layout style={{ background: 'none', padding: 30 }}>
          <Header style={{ background: 'none' }}>
            <Title level={1} style={titleStyle}>GAME NIGHT</Title>
          </Header>
          <App />
        </Layout>
      </WebSocketProvider>
    </Provider>
  )
}
export default AppWrapper