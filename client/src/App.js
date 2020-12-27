import React, { useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { ReactComponent as Circle } from './icons/svg/circle.svg';
import './App.css';
import { WebSocketProvider, store, WebSocketContext } from './utils';
import TopHeader from './TopHeader'
import SignIn from './SignIn'
import SocialSider from './SocialSider'
import Scattergories from './Scattergories/Scattergories';
const { Sider, Content } = Layout;

const noBg = { background: 'none' }
const mainLayout = { ...noBg, padding: 30, minHeight: '100vh', justifyContent: 'center' }

const App = () => {
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const ws = useContext( WebSocketContext );

  if ( !room || !username || !avatar ) return <SignIn />
  else ws.addPlayer( room, username, avatar )

  return (
    <>
      <Layout style={{ ...noBg, zIndex: 1 }}>
        <TopHeader />
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
          <div className='bgCircle'>
            <Circle style={{ height: '100%' }} />
          </div>
          <Layout style={mainLayout}>
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