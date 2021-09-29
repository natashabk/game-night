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
import Play from './Play'
const { Sider, Content } = Layout;

const noBg = { background: 'none' }
const mainLayout = { ...noBg, padding: 30, minHeight: '100vh', justifyContent: 'center' }
const App = () => {
  const [ windowHeight, setWindowHeight ] = useState( window.innerHeight )
  const [ gameMode, setGameMode ] = useState( false )
  const room = useSelector( state => state.room );
  const game = useSelector( state => state.game );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const ws = useContext( WebSocketContext );

  const side = { background: '#ffffff66', maxHeight: windowHeight - 60 }

  useEffect( () => {
    const handleResize = () => setWindowHeight( window.innerHeight );
    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize );
  }, [] );

  useEffect( () => {
    if ( game && game.name === 'Scattergories' && game.round % 2 === 0 ) {
      setGameMode( true )
    }
  }, [ game ] )

  if ( !room || !username || !avatar ) return <SignIn />
  else ws.addPlayer( room, username, avatar )

  return (
    <>
      <Layout style={{ ...noBg, zIndex: 1 }}>
        <Brand gameMode={gameMode}/>
        <Content style={{ ...noBg, padding: gameMode ? 0 : 30, display: 'flex' }}>
          <Play />
        </Content>
      </Layout>
      {
        !gameMode &&
        <Sider theme="light" width={300} style={side}>
          <SocialSider windowHeight={windowHeight} />
        </Sider>
      }
    </>
  )
}

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}>
        <WebSocketProvider>
          <div className='bgCircleWrap'>
            <Circle style={{ height: '100%' }} className='bgCircle' />
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