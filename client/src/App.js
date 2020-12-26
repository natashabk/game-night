import React, { useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { Layout, Typography, } from 'antd';
import SignIn from './SignIn'
import SocialSider from './SocialSider'
import './App.css';
import { WebSocketProvider, store, WebSocketContext } from './utils';
import Scattergories from './Scattergories/Scattergories';
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const noBg = { background: 'none' }
const titleStyle = { color: 'white', textAlign: 'center', maxWidth: 1300 }

export const gnHead = (
  <Header style={noBg}>
    <Title level={1} style={titleStyle}>GAME NIGHT</Title>
  </Header>
)

const App = () => {
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const ws = useContext( WebSocketContext );

  let { roomId } = useParams();

  if ( !room || !username || !avatar ) {
    return <Redirect to={{ pathname: "/", state: { roomId: roomId } }} />
  }
  else { ws.addPlayer( room, username, avatar ) }

  return (
    <>
      <Layout style={noBg}>
        {gnHead}
        <Content style={{ ...noBg, padding: 30 }}>
          <Scattergories />
        </Content>
      </Layout>
      <Sider theme="light" width={300} style={{ height: 'fit-content' }}>
        <SocialSider />
      </Sider>
    </>
  )
}

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}>
        <WebSocketProvider>
          <Layout style={{ ...noBg, padding: 30 }}>
            <Switch>
              <Route path={`/:roomId`}>
                <App />
              </Route>
              <Route path='/'>
                <SignIn />
              </Route>
            </Switch>
          </Layout>
        </WebSocketProvider>
      </Provider>
    </Router>
  )
}
export default AppWrapper