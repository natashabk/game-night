import React, { useState } from 'react';
import { Typography, Col, Row, Card, Button } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import Scattergories from './Scattergories/Scattergories';
import Help from './Help';
const { Text, Title } = Typography;
const bold = { fontWeight: 600 }
const labelStyle = { ...bold, color: '#fff' }
const gameCard = { width: 650, background: '#ffffff4d', marginBottom: 20 }
const gameSummaries = [
  {
    name: 'Scattergories',
    desc: 'Score points by naming unique objects in the provided set of categories before time runs out (more instructions inside).',
    players: '2-6',
    team: 'Individual or teams (if team members are in the same location)'
  }
]

const start = ( game ) => {
  console.log( game.name )
}
const GameMenu = () => {
  const [ helpOpen, setHelpOpen ] = useState( false )
  return (
    <Col>
      <Row type='flex' style={{ alignItems: 'center', marginBottom: 10 }}>
        <Button shape="circle" icon={<QuestionOutlined />} size='small' onClick={() => setHelpOpen( !helpOpen )} />
        <Title level={2} style={{ marginLeft: 15, color: '#fff', marginBottom: 0 }}>Menu</Title>
      </Row>
      <Row>
        {helpOpen && <Help setHelpOpen={setHelpOpen} />}
        {gameSummaries.map( ( game, idx ) => (
          <Card key={`${ idx }`} bordered={false} hoverable style={gameCard} onClick={() => start( game )}>
            <Title level={3} style={{ color: '#fff' }}>{game.name}</Title>
            <Text style={{ fontSize: 16 }}>
              <span style={labelStyle}>How to play: </span>{game.desc}<br />
              <span style={labelStyle}>Recommended number of players: </span>{game.players}<br />
              <span style={labelStyle}>Team style: </span>{game.team}
            </Text>
          </Card>
        ) )}
      </Row>
    </Col >
  )
}

export default GameMenu;