import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Row } from 'antd';
import { setUsername, setAvatar, createRoom, joinRoom } from '../utils';
import { gnHead } from '../App';
import CreateOrJoinRoom from './CreateOrJoinRoom'
import CreateUserName from './CreateUsername'
import { icons } from '../icons/svg';

export const lightWhite = '#ffffff4d'
export const inputStyle = { maxWidth: 355, minWidth: 200 }
export const btnStyle = { height: 40, width: 145 }

const randomIcon = () => Object.keys( icons )[ Math.floor( Math.random() * 12 ) ]

const SignIn = () => {
  const [ mode, setMode ] = useState( 'room' )
  const [ usernameInput, setUsernameInput ] = useState()
  const [ iconInput, setIconInput ] = useState( randomIcon() )
  const [ roomName, setRoomName ] = useState();
  const [ roomId, setRoomId ] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const room = useSelector( state => state.room );

  useEffect( () => {
    if ( location.state && location.state.roomId ) {
      setRoomId( location.state.roomId )
      setMode( 'user' )
    }
  }, [ location ] )

  useEffect( () => {
    if ( room && room.id ) history.push( `/${ room.id }` ) //tells router to load the app component
  }, [ room, history ] )

  useEffect( () => {
    if ( roomName && username && avatar ) dispatch( createRoom( roomName, username, avatar ) )
    else if ( roomId && username && avatar ) dispatch( joinRoom( roomId, username, avatar ) )
  }, [ roomName, roomId, username, avatar, dispatch ] )

  const enterRoom = () => {
    dispatch( setUsername( usernameInput ) )
    dispatch( setAvatar( iconInput ) )
  };

  return (
    <>
      {gnHead}
      <Row justify={'center'}>
        <Card style={{ width: 550, background: lightWhite }}>
          {mode === 'room' ?
            <CreateOrJoinRoom setRoomName={setRoomName} setRoomId={setRoomId} setMode={setMode} /> :
            <CreateUserName
              setUsernameInput={setUsernameInput}
              setIconInput={setIconInput}
              iconInput={iconInput}
              enterRoom={enterRoom}
              setRoomId={setRoomId}
              roomId={roomId}
              setMode={setMode}
            />
          }
        </Card>
      </Row>
    </>
  );
}

export default SignIn;