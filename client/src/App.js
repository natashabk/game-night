import React, { useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import { WebSocketProvider, store, WebSocketContext } from './utils';
import TopHeader from './TopHeader'
import SignIn from './SignIn'
import SocialSider from './SocialSider'
import Scattergories from './Scattergories/Scattergories';
const { Sider, Content } = Layout;

const noBg = { background: 'none' }
const App = () => {
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const err = useSelector( state => state.error );
  const ws = useContext( WebSocketContext );

  if ( !room || !username || !avatar ) return <SignIn />
  else ws.addPlayer( room, username, avatar )

  return (
    <>
      <Layout style={noBg}>
        <TopHeader err={err} />
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