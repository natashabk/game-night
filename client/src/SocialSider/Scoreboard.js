import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Col, Row, Typography, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { icons } from '../icons/svg';
import { WebSocketContext } from '../utils';
const { Text } = Typography

const scoreBtn = { fontSize: 12, padding: 0, width: 24, minWidth: 24, height: 24, paddingTop: 2 }
const rowStyle = ( last ) => (
  { marginBottom: 5, borderBottom: last ? 'none' : '1px solid #d9d9d9', justifyContent: 'space-between' }
)

const Scoreboard = () => {
  const room = useSelector( state => state.room );
  const players = useSelector( state => state.room.players );
  const ws = useContext( WebSocketContext );

  const handleChangeScore = ( idx, action ) => {
    const player = players[ idx ]
    const newScore = action === '+' ? ( player.score + 1 ) : ( player.score - 1 )
    ws.changeScore( room.id, idx, newScore )
  }

  if ( players ) return (
    <Col style={{ padding: '15px 15px 0px', width: '100%' }}>
      {players.map( ( player, idx ) => {
        const { username, avatar, score } = player
        return (
          <Row key={`ps${ idx }`} style={rowStyle( idx === players.length - 1 )}>
            <Col span={13} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
              <div style={{ height: 20, width: 20, display: 'inline-flex', marginRight: 3 }}>
                {avatar && icons[ avatar ]}
              </div>
              <Text style={{ fontSize: 20 }}>{username}</Text>
            </Col>
            <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 25, marginRight: 5, color: '#8d21b6' }}>{score}</Text>
            </Col>
            <Col span={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Row type='flex' style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button
                  style={{ ...scoreBtn, marginRight: 2 }}
                  shape='circle'
                  onClick={() => handleChangeScore( idx, '+' )}
                  icon={<PlusOutlined />}
                />
                <Button
                  style={scoreBtn}
                  shape='circle'
                  onClick={() => handleChangeScore( idx, '-' )}
                  icon={<MinusOutlined />}
                />
              </Row>
            </Col>
          </Row>
        )
      } )}
    </Col>
  )
  else return <div />
}
export default Scoreboard;