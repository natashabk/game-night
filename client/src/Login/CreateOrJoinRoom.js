import React from 'react';
import { Input, Button, Divider, Row } from 'antd';
import { lightWhite, inputStyle, btnStyle } from './index'

const CreateOrJoinRoom = ( { setRoomName, setRoomId, setMode } ) => {
  return (
    <>
      <Row>
        <Input
          size="large"
          placeholder="Create a new room"
          onChange={( e ) => setRoomName( e.target.value )}
          onPressEnter={() => setMode( 'user' )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => setMode( 'user' )} style={btnStyle}>
          Create
        </Button>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row>
        <Input
          size="large"
          placeholder="Join an existing room"
          onChange={( e ) => setRoomId( e.target.value )}
          onPressEnter={() => setMode( 'user' )}
          style={inputStyle}
        />
        <Button type='primary' onClick={() => setMode( 'user' )} style={btnStyle}>
          Join
        </Button>
      </Row>
    </>
  )
}

export default CreateOrJoinRoom