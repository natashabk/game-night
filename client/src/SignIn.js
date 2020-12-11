import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { Input, Button, Card, Divider, Row } from 'antd';
import { createRoom, joinRoom, setUsername } from './utils';

const lightWhite = '#ffffff38'
const btnStyle = { height: 40, width: 75 }
const inputStyle = { maxWidth: 400, minWidth: 200 }

const CreateUserName = () => {
  const [ usernameInput, setUsernameInput ] = useState( "" );
  const dispatch = useDispatch();
  const enterRoom = () => dispatch( setUsername( usernameInput ) );

  return (
    <Row>
      <Input
        size="large"
        inputProps
        placeholder="Enter username"
        onChange={( e ) => setUsernameInput( e.target.value )}
        onPressEnter={enterRoom}
        style={inputStyle}
      />
      <Button type='primary' onClick={enterRoom} style={btnStyle}>Join</Button>
    </Row>
  )
}

const CreateOrJoinRoom = () => {
  const [ roomName, setRoomName ] = useState( "" );
  const [ roomId, setRoomId ] = useState( "" );
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Input
          size="large"
          placeholder="Create a new room"
          onChange={( e ) => setRoomName( e.target.value )}
          onPressEnter={() => dispatch( createRoom( roomName ) )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => dispatch( createRoom( roomName ) )} style={btnStyle}>
          Create
        </Button>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row>
        <Input
          size="large"
          placeholder="Join an existing room"
          onChange={( e ) => setRoomId( e.target.value )}
          onPressEnter={() => dispatch( joinRoom( roomId ) )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => dispatch( joinRoom( roomId ) )} style={btnStyle}>
          Join
        </Button>
      </Row>
    </>
  )
}

const SignIn = () => {
  const room = useSelector( state => state.room );
  return (
    <Row justify={'center'}>
      <Card style={{ width: 550, background: lightWhite }}>
        {room ? <CreateUserName /> : <CreateOrJoinRoom />}
      </Card>
    </Row>
  );
}

export default SignIn;