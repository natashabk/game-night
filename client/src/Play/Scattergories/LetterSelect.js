import React from 'react'
import { useSelector } from 'react-redux';
import { Row, Button } from 'antd';

const letterBox = {
  background: 'white',
  height: 31,
  width: 31,
  marginLeft: 5,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomCharacter = () => alphabet[ Math.floor( Math.random() * alphabet.length ) ]

const LetterSelect = ( { updateLetter, updateRound } ) => {
  const game = useSelector( state => state.game );
  return (
    <Row style={{ margin: 'auto' }}>
      <Button onClick={() => updateLetter( randomCharacter() )}>Select Random Letter</Button>
      <div style={letterBox}>
        {game.letter}
      </div>
      <Button style={{ margin: '50px auto' }} onClick={() => updateRound( game.round + 1 )}>Start Round</Button>
    </Row>
  )
}
export default LetterSelect;