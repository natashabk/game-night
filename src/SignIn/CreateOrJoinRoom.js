import React, { useState } from 'react';
import { Input, Button, Divider, Row } from 'antd';
import { useDispatch } from 'react-redux'
import { createRoom, checkRoom } from '../utils';
import { lightWhite } from './index'

const CreateOrJoinRoom = () => {
  const [ roomId, setRoomId ] = useState();
  const dispatch = useDispatch();

  const createNewRoom = () => {
    dispatch( createRoom() )
  }

  const checkRoomId = () => {
    dispatch( checkRoom( roomId ) )
  }

  return (
    <>
      <Row justify='center'>
        <Button type='primary' onClick={() => createNewRoom()} style={{ height: 40, width: 200 }}>
          Create new room
        </Button>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row justify='center'>
        <Input
          size="large"
          placeholder="Enter room ID"
          onChange={( e ) => setRoomId( e.target.value )}
          onPressEnter={() => checkRoomId()}
          style={{ maxWidth: 140 }}
        />
        <Button type='primary' onClick={() => checkRoomId()} style={{ height: 40, width: 60 }}>
          Join
        </Button>
      </Row>
    </>
  )
}

export default CreateOrJoinRoom