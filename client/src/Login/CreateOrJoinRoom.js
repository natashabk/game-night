import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Divider, Row } from 'antd';
import { createRoom, joinRoom } from '../utils';
import { lightWhite, inputStyle, btnStyle } from './index'

const CreateOrJoinRoom = () => {
  const [ roomName, setRoomName ] = useState( "" );
  const [ roomId, setRoomId ] = useState( "" );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
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
        <Button type='primary' onClick={() => dispatch( createRoom( roomName, username, avatar ) )} style={btnStyle}>
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
        <Button type='primary' onClick={() => dispatch( joinRoom( roomId, username, avatar ) )} style={btnStyle}>
          Join
        </Button>
      </Row>
    </>
  )
}

export default CreateOrJoinRoom