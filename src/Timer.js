import React, { useState, useEffect } from 'react'
import Circle from './Circle'
let paused = 0;

const CircleTimer = ( { size, fontSize, minutes, fillColor, bgColor, showMs, onComplete, completeMsg, running, timeAtLoad } ) => {
  const [ ms, setMs ] = useState( minutes * 1000 * 60 )
  const [ startTime, setStartTime ] = useState( timeAtLoad )
  const [ timeRunning, setTimeRunning ] = useState( running )
  const [ count, setCount ] = useState( 0 )

  const timeLeft = ( ms + startTime ) - Date.now()
  let mins = Math.floor( ( timeLeft % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
  let secs = Math.floor( ( timeLeft % ( 1000 * 60 ) ) / 1000 );
  let mils = Math.floor( ( timeLeft % ( 1000 * 60 ) ) / 10 );

  const startTimer = () => {
    setMs( paused )
    setStartTime( Date.now() )
    setTimeRunning( true )
  }
  const stopTimer = () => {
    paused = timeLeft
    setTimeRunning( false )
  }

  useEffect( () => {
    if ( count > 0 ) { running ? startTimer() : stopTimer() }
    // eslint-disable-next-line
  }, [ running ] )

  useEffect( () => {
    if ( timeLeft > 0 && timeRunning ) {
      const tick = setInterval( () => setCount( count + 1 ), 100 );
      return () => clearInterval( tick );
    } else if ( timeLeft <= 0 && timeRunning ) { onComplete() }
  } );

  const pad = ( num ) => ( '00' + num ).slice( -2 )

  return (
    <div>
      <Circle
        size={size}
        fontSize={fontSize}
        minutes={minutes}
        fill={fillColor}
        bg={bgColor}
        timeRunning={timeRunning}
      >
        {timeLeft > 0 && `${ pad( mins ) }:${ pad( secs ) }${ showMs ? `:${ pad( mils ) }` : '' }`}
        {timeLeft <= 0 && completeMsg}
      </Circle>
    </div>
  );
}

export default CircleTimer;
