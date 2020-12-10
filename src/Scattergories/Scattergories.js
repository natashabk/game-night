import React, { useState } from 'react';
import Board from './Board';
import Instructions from './Instructions';
import Scoreboard from '../Scoreboard';

const Scattergories = () => {
  const [ round, setRound ] = useState( 0 )
  const [ letter, setLetter ] = useState( '-' )
  const [ locked, setLocked ] = useState( false )
  const [ scores, setScores ] = useState( [] )

  if ( round ) return <Board round={round} locked={locked} />
  else if ( round === 0 ) return <Instructions letter={letter} setLetter={setLetter} />
  else return <Scoreboard scores={scores} setScores={setScores} />

}
export default Scattergories;