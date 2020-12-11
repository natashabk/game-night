import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row } from 'antd';
import { setUsername, setAvatar, createRoom, joinRoom } from '../utils';
import CreateOrJoinRoom from './CreateOrJoinRoom'
import CreateUserName from './CreateUsername'
import { icons } from '../icons/svg';

export const lightWhite = '#ffffff38'
export const inputStyle = { maxWidth: 400, minWidth: 200 }
export const btnStyle = { height: 40, width: 75 }

const randomIcon = () => Object.keys( icons )[ Math.floor( Math.random() * 11 ) ]

const SignIn = () => {
  const [ mode, setMode ] = useState( 'room' )
  const [ usernameInput, setUsernameInput ] = useState()
  const [ iconInput, setIconInput ] = useState( randomIcon() )
  const [ roomName, setRoomName ] = useState();
  const [ roomId, setRoomId ] = useState();

  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );

  const dispatch = useDispatch();

  useEffect( () => {
    if ( roomName && username && avatar ) dispatch( createRoom( roomName, username, avatar ) )
    else if ( roomId && username && avatar ) dispatch( joinRoom( roomId, username, avatar ) )
  }, [ mode ] )

  const enterRoom = () => {
    dispatch( setUsername( usernameInput ) )
    dispatch( setAvatar( iconInput ) )
    setMode( 'done' )
  };

  return (
    <Row justify={'center'}>
      <Card style={{ width: 550, background: lightWhite }}>
        {mode === 'room' ?
          <CreateOrJoinRoom setRoomName={setRoomName} setRoomId={setRoomId} setMode={setMode} /> :
          <CreateUserName setUsernameInput={setUsernameInput} setIconInput={setIconInput} iconInput={iconInput} enterRoom={enterRoom} />
        }
      </Card>
    </Row>
  );
}

export default SignIn;