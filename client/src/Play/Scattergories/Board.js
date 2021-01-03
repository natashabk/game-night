import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Input, Typography, Divider, Checkbox } from 'antd';
import { categories } from './const'
import { WebSocketContext } from '../../utils';
import LetterClock from './LetterClock'
const { Title } = Typography
const categoryCol = { textAlign: 'right', color: '#fff', paddingRight: 10, fontSize: 16 }

const Board = ( { updateRound } ) => {
  const [ locked, setLocked ] = useState( false )
  const [ filledOut, setFilledOut ] = useState( [] )
  const [ total, setTotal ] = useState( filledOut.length )

  const game = useSelector( state => state.game );
  const players = useSelector( state => state.room.players );
  const roomId = useSelector( state => state.room.id );
  const name = useSelector( state => state.username );

  const ws = useContext( WebSocketContext );

  const player = players.find( item => item.username === name )
  const playerIdx = players.indexOf( player )

  const handlePointChange = ( e ) => {
    const point = e.target.checked
    let newScore = player.score
    if ( point ) {
      setTotal( total + 1 )
      newScore++;
    }
    else {
      setTotal( total - 1 )
      newScore--;
    }
    ws.changeScore( roomId, playerIdx, newScore )
  }

  const addPoints = ( e, idx ) => {
    const field = e.target.value
    if ( field && !filledOut.includes( idx ) ) { //add point for filling out field
      setFilledOut( [ ...filledOut, idx ] )
    }
    else if ( !field ) { //if user clears the field during gameplay, remove point
      let filled = filledOut
      filled.splice( filled.indexOf( idx ), 1 )
      setFilledOut( filled )
    }
  }

  useEffect( () => {
    setTotal( filledOut.length )
  }, [ filledOut ] )

  useEffect( () => {
    if ( locked ) ws.changeScore( roomId, playerIdx, player.score + filledOut.length )
  }, [ locked ] )

  return (
    <div style={{ width: '100%' }}>
      <LetterClock locked={locked} setLocked={setLocked} updateRound={updateRound} />
      <Row style={{ width: 650, margin: 'auto' }}>
        <Divider style={{ borderTop: '1px solid #ffffff8c', margin: '8px 0px' }} />
      </Row>
      {categories[ ( game.round / 2 ) - 1 ].map( ( category, idx ) => (
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
      {locked ? <Title level={2} style={{ color: 'white', textAlign: 'center' }}>ROUND TOTAL: {total}</Title> : null}
    </div>
  )
}


export default Board;
