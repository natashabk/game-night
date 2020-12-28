import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Input, Button, Divider, Row, Radio, Typography } from 'antd';
import { icons } from '../icons/svg';
import { setUsername, setAvatar, resetRoom, joinRoom } from '../utils';
import { lightWhite, inputStyle, btnStyle } from './index'
const { Text } = Typography
const iconStyle = { height: 40, width: 40, borderRadius: 6, padding: 0, margin: 0 }
const changeIdBtn = { fontSize: 12, fontWeight: 600 }
const randomIcon = () => Object.keys( icons )[ Math.floor( Math.random() * 12 ) ]

const CreateUsername = () => {
  const [ usernameInput, setUsernameInput ] = useState()
  const [ iconInput, setIconInput ] = useState( randomIcon() )

  const dispatch = useDispatch();
  const history = useHistory();
  const room = useSelector( state => state.room );

  const changeRoom = () => {
    history.push( '/' )
    dispatch( resetRoom() )
  }

  const enterRoom = () => {
    dispatch( setUsername( usernameInput ) )
    dispatch( setAvatar( iconInput ) )
    dispatch( joinRoom( room.id, usernameInput, iconInput ) )
  };

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
        {room && room.id &&
          <Text style={{ paddingBottom: 10 }}>
            You're about to join room <span style={{ fontWeight: 600 }}>{room.id}</span>.
              <Button type='link' style={changeIdBtn} onClick={() => changeRoom()}>
              Change room
              </Button>
          </Text>
        }
        <Input
          size="large"
          maxLength={12}
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