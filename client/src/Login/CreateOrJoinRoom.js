import React from 'react';
import { Input, Button, Divider, Row } from 'antd';
import { lightWhite, inputStyle, btnStyle } from './index'

const CreateOrJoinRoom = ( { setRoomName, setRoomId, setMode } ) => {
  return (
    <>
      <Row>
        <Input
          size="large"
          maxLength={20}
          placeholder="Enter a short name for your group"
          onChange={( e ) => setRoomName( e.target.value )}
          onPressEnter={() => setMode( 'user' )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => setMode( 'user' )} style={btnStyle}>
          Create new room
        </Button>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row>
        <Input
          size="large"
          placeholder="Enter room ID"
          onChange={( e ) => setRoomId( e.target.value )}
          onPressEnter={() => setMode( 'user' )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => setMode( 'user' )} style={btnStyle}>
          Join room
        </Button>
      </Row>
    </>
  )
}

export default CreateOrJoinRoom