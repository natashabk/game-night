import React from 'react';
import { Input, Button, Divider, Row, Radio, Typography } from 'antd';
import { icons } from '../icons/svg';
import { lightWhite, inputStyle, btnStyle } from './index'
const { Text } = Typography
const iconStyle = { height: 40, width: 40, borderRadius: 6, padding: 0, margin: 0 }

const CreateUsername = ( { setUsernameInput, setIconInput, iconInput, enterRoom } ) => {
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