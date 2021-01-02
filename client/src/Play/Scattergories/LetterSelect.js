import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Row, Button } from 'antd';
import './LetterSelect.css';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomCharacter = () => alphabet[ Math.floor( Math.random() * alphabet.length ) ]

const LetterSelect = ( { updateLetter, updateRound } ) => {
  const [ start, setStart ] = useState( false )
  const [ letterSet, setLetterSet ] = useState( alphabet.split( '' ) )
  const game = useSelector( state => state.game );

  const spin = async () => {
    //shuffle alphabet
    let shuffled = alphabet.split( '' ).sort( function () { return 0.5 - Math.random() } );
    //select the character it will land on and send to server
    const newRandom = randomCharacter()
    await updateLetter( newRandom )
    //move that character to the last position in the array
    shuffled.splice( shuffled.indexOf( newRandom ), 1 )
    shuffled = [ ...shuffled, newRandom ]
    setLetterSet( shuffled )
    setStart( true )
  }
  // add button to go to next round tomorrow
  // onClick={() => updateRound( game.round + 1 )} 

  return (
    <Row>
      <div className='spinWrapper'>
        {start ?
          letterSet.map( char => <div className='letter' key={char}>{char}</div> ) :
          <div className='letter-fake'>A</div>}

      </div>
      <Button style={{ marginLeft: 20 }} type='primary' onClick={() => spin()}>Spin</Button>
    </Row>
  )
}
export default LetterSelect;