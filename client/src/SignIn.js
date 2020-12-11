import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './App.css';
import { Input, Button, Card, Divider, Row } from 'antd';
import { createRoom, joinRoom } from './utils/actions';

const lightWhite = '#ffffff38'

const SignIn = () => {
  const [ roomName, setRoomName ] = useState( "" );
  const [ roomId, setRoomId ] = useState( "" );

  const dispatch = useDispatch();

  return (
    <Card style={{ width: 550, background: lightWhite }}>
      <Row>
        <Input
          size="large"
          placeholder="Create a new room"
          onChange={( e ) => setRoomName( e.target.value )}
          onEnter={() => dispatch( createRoom( roomName ) )}
          style={{ maxWidth: 400, minWidth: 200 }}
        />
        <Button type='primary' onClick={() => dispatch( createRoom( roomName ) )} style={{ height: 40, width: 75 }}>
          Create
            </Button>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row>
        <Input
          size="large"
          placeholder="Join an existing room"
          onChange={( e ) => setRoomId( e.target.value )}
          onEnter={() => dispatch( joinRoom( roomId ) )}
          style={{ maxWidth: 400, minWidth: 200 }}
        />
        <Button type='primary' onClick={() => dispatch( joinRoom( roomId ) )} style={{ height: 40, width: 75 }}>
          Join
            </Button>
      </Row>
    </Card>
  );
}

export default SignIn;