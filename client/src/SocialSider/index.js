import React, { useState } from 'react';
import { Row, Col, Radio } from 'antd'
import Heading from './Heading';
import ScoreBoard from './Scoreboard';
import Chat from './Chat';
const { Group, Button } = Radio;
const btnRow = { display: 'flex', width: '100%' }
const btn = { width: '100%', textAlign: 'center', boxShadow: 'none' }



const SocialSider = ( { windowHeight } ) => {
  const [ open, setOpen ] = useState( 'chat' )

  console.log( windowHeight )
  return (
    <Col style={{ height: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Heading />
      <Row>
        <Group value={open} onChange={( e ) => setOpen( e.target.value )} style={btnRow}>
          <Col span={12}>
            <Button style={btn} value="chat">Chat</Button>
          </Col>
          <Col span={12}>
            <Button style={btn} value="score">Scoreboard</Button>
          </Col>
        </Group>
      </Row>
      <Row style={{ display: 'flex', flexGrow: 2, border: '1px solid #fff', borderTop: 'none', maxHeight: windowHeight - 147 }}>
        {open === 'score' && <ScoreBoard />}
        {open === 'chat' && <Chat />}
      </Row>
    </Col>
  )
}

export default SocialSider