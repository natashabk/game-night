import React, { useContext, useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { ReactComponent as Circle } from './icons/svg/circle.svg';
import './App.css';
import { WebSocketProvider, store, WebSocketContext } from './utils';
import Brand from './Brand'
import SignIn from './SignIn'
import SocialSider from './SocialSider'
import GameMenu from './GameMenu'
const { Sider, Content } = Layout;

const noBg = { background: 'none' }
const mainLayout = { ...noBg, padding: 30, minHeight: '100vh', justifyContent: 'center' }

const App = () => {
  const [ windowHeight, setWindowHeight ] = useState( window.innerHeight )
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const ws = useContext( WebSocketContext );

  useEffect( () => {
    const handleResize = () => setWindowHeight( window.innerHeight );
    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize );
  }, [] );

  if ( !room || !username || !avatar ) return <SignIn />
  else ws.addPlayer( room, username, avatar )

  return (
    <>
      <Layout style={{ ...noBg, zIndex: 1 }}>
        <Brand />
        <Content style={{ ...noBg, padding: 30 }}>
          <GameMenu />
        </Content>
      </Layout>
      <Sider theme="light" width={300} style={{ background: '#ffffff66', maxHeight: windowHeight - 60 }}>
        <SocialSider windowHeight={windowHeight} />
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