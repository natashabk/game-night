import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Row, Button, Typography } from 'antd';
import { bgSpin } from '../../utils'
import './LetterSelect.css';
const { Text, Title } = Typography

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomCharacter = () => alphabet[ Math.floor( Math.random() * alphabet.length ) ]
const white = { color: '#fff' }


const LetterSelect = ( { updateLetter, updateRound } ) => {
  const [ spinning, setSpinning ] = useState( false )
  const [ letterSet, setLetterSet ] = useState( alphabet.split( '' ) )
  const { round, letter } = useSelector( state => state.game );

  const startSpin = async () => {
    const newRandom = randomCharacter()
    await updateLetter( newRandom )
  }
  const spin = useCallback( () => {
    //shuffle alphabet
    let shuffled = alphabet.split( '' ).sort( function () { return 0.5 - Math.random() } );
    //move the chosen character to the last position in the array
    shuffled.splice( shuffled.indexOf( letter ), 1 )
    shuffled = [ ...shuffled, letter ]
    setLetterSet( shuffled )
    setSpinning( true )
    bgSpin( 'once' )
  }, [ letter ] )

  useEffect( () => {
    if ( letter ) spin()
  }, [ letter, spin ] )

  useEffect( () => {
    const animationComplete = setTimeout( () => {
      setSpinning( false )
      bgSpin( 'onceDone' )
    }, 5000 );
    return () => clearTimeout( animationComplete )
  }, [ spinning ] )


  const letterBlocks = () => (
    letterSet.map( char => (
      <div className='letter spin' key={char}>
        <Text>{char}</Text>
      </div>
    ) )
  )

  return (
    <Row type='flex' justify='center' align='middle' style={{ flexDirection: 'column', width: '100%' }}>
      <Title level={3} style={{ ...white, marginBottom: 0 }}>
        To start the round, any player can spin the wheel.
      </Title>
      <Text style={white}>All of your answers on the next page must begin with this letter.</Text>
      <Row type='flex' align='middle' style={{ marginTop: 50 }}>
        <div className='spinWrapper'>
          {spinning || letter ? letterBlocks() : <div className='letter'>A</div>}
        </div>
        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          disabled={spinning}
          onClick={() => startSpin()}
        >
          Spin
        </Button>
      </Row>
      <Row type='flex' align='middle' style={{ marginTop: 50, visibility: letter && !spinning ? 'unset' : 'hidden' }}>
        <Text style={white}>Is everyone ready?</Text>
        <Button
          type='primary'
          onClick={() => updateRound( round + 1 )}
          style={{ marginLeft: 10 }}
        >
          Start Round
        </Button>
      </Row>
    </Row>
  )
}
export default LetterSelect;