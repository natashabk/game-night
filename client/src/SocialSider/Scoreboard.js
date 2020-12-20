import React from 'react'
import { useSelector } from 'react-redux';
import { Col, Row, Typography, InputNumber } from 'antd';
import { icons } from '../icons/svg';
const { Text } = Typography

const Scoreboard = () => {
  const players = useSelector( state => state.room.players );
  const rowStyle = ( last ) => ( { marginBottom: 5, borderBottom: last ? 'none' : '1px solid #d9d9d9' } )

  if ( players ) return (
    <Col style={{ padding: '15px 15px 0px' }}>
      {players.map( ( player, idx ) => (
        <Row key={`ps${ idx }`} style={rowStyle( idx === players.length - 1 )}>
          <Col span={12} >
            <div style={{ height: 20, width: 20, display: 'inline-flex', marginRight: 3 }}>
              {player.avatar && icons[ player.avatar ]}
            </div>
            <Text style={{ fontSize: 20 }}>{player.username}</Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: 20 }}>{player.score}</Text>
          </Col>
        </Row>
      ) )}
    </Col>
  )
  else return <div />
}
export default Scoreboard;