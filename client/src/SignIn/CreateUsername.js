import React from 'react';
import { Input, Button, Divider, Row, Radio, Typography } from 'antd';
import { icons } from '../icons/svg';
import { lightWhite, inputStyle, btnStyle } from './index'
const { Text } = Typography
const iconStyle = { height: 40, width: 40, borderRadius: 6, padding: 0, margin: 0 }
const changeIdBtn = { fontSize: 12, fontWeight: 600 }
const CreateUsername = ( { setUsernameInput, setIconInput, iconInput, enterRoom, setRoomId, roomId, setMode } ) => {
  const changeRoom = () => {
    setRoomId()
    setMode( 'room' )
  }

  const iconButton = ( item ) => (
    <button
      value={item}
      key={item}
      style={{
        ...iconStyle,
        background: iconInput === item ? lightWhite : 'none',
        border: iconInput === item ? '2px solid white' : 'none'
      }}
      onClick={() => setIconInput( item )}
    >
      {icons[ item ]}
    </button>
  )
  return (
    <>
      <Row style={{ minHeight: 70 }}>
        <Text>Select avatar:</Text>
        <Radio.Group style={{ display: 'flex', marginTop: 3 }}>
          {Object.keys( icons ).map( item => iconButton( item ) )}
        </Radio.Group>
      </Row>
      <Divider style={{ background: lightWhite }} />
      <Row>
        {roomId &&
          <Text style={{ paddingBottom: 10 }}>
            You're about to join room <span style={{ fontWeight: 600 }}>{roomId}</span>.
              <Button type='link' style={changeIdBtn} onClick={() => changeRoom()}>
              Change room
              </Button>
          </Text>
        }
        <Input
          size="large"
          placeholder="Enter username"
          onChange={( e ) => setUsernameInput( e.target.value )}
          onPressEnter={enterRoom}
          style={inputStyle}
        />
        <Button type='primary' onClick={enterRoom} style={btnStyle}>Join</Button>
      </Row>
    </>
  )
}

export default CreateUsername