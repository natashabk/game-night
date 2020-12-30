import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Timer from 'simple-circle-timer'
import { Row, Col, Input, Typography, Divider, Card, Checkbox } from 'antd';
import { categories } from './const'
const { Text, Title } = Typography
const categoryCol = { textAlign: 'right', color: '#fff', paddingRight: 10, fontSize: 16 }
const Board = ( { locked, updateRound, setLocked } ) => {
  const [ filledOut, setFilledOut ] = useState( [] )
  const [ total, setTotal ] = useState( filledOut.length )
  const game = useSelector( state => state.game );

  const handlePointChange = ( e ) => {
    const point = e.target.checked
    if ( point ) setTotal( total + 1 )
    else setTotal( total - 1 )
  }

  const addPoints = ( e, idx ) => {
    const field = e.target.value
    if ( field && !filledOut.includes( idx ) ) {
      setFilledOut( [ ...filledOut, idx ] )
    }
    else if ( !field ) {
      let filled = filledOut
      filled.splice( filled.indexOf( idx ), 1 )
      setFilledOut( filled )
    }
  }

  //<Button onClick={() => updateRound( game.round + 1 )}>Next Round</Button>
  console.log( filledOut )
  return (
    <>
      <Card style={{ background: '#ffffff4d', marginBottom: 20, width: 200, position: 'fixed' }} bodyStyle={{ padding: 16 }}>
        <Row justify='center' style={{ textAlign: 'center' }}>
          <Title level={3} style={{ color: '#fff' }}>Round {game.round - 1}</Title>
        </Row>
        <Row type='flex' justify='space-between' style={{ alignItems: 'center' }}>
          <Col style={{ textAlign: 'center', marginTop: -10 }}>
            <Text style={{ color: '#fff' }}>Letter</Text>
            <Title level={1} style={{ background: '#FF006E', margin: 0, borderRadius: 4, textAlign: 'center', fontSize: 45, padding: '0px 10px', color: '#fff' }}>
              {game.letter}
            </Title>
          </Col>
          <Timer
            size={80}
            fontSize={20}
            minutes={0.22}
            fillColor={'#FF006E'}
          // onComplete={() => setLocked( true )}
          />
        </Row>
      </Card>
      <Row style={{ width: 650, margin: 'auto' }}>
        <Divider style={{ borderTop: '1px solid #ffffff8c', margin: '8px 0px' }} />
      </Row>
      {categories[ game.round - 1 ].map( ( category, idx ) => (
        <Row style={{ width: 650, margin: 'auto' }} key={`${ idx }`}>
          <Col span={locked ? 17 : 18} style={categoryCol}>{category}</Col>
          <Col span={6}>
            <Input allowClear disabled={locked} onChange={( e ) => addPoints( e, idx )} />
          </Col>
          {locked && (
            <Col span={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Checkbox disabled={!locked} defaultChecked={filledOut.includes( idx )} onChange={handlePointChange} />
            </Col>
          )}
          <Divider style={{ borderTop: '1px solid #ffffff8c', margin: '8px 0px' }} />
        </Row>
      ) )}
      {locked ? <Title level={1} style={{ color: 'white', textAlign: 'center', maxWidth: 1300 }}>ROUND TOTAL: {total}</Title> : null}
    </>
  )
}


export default Board;
