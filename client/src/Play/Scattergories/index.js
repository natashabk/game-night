import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Board from './Board';
import Instructions from './Instructions';
import LetterSelect from './LetterSelect';

const Scattergories = ( { updateGame } ) => {
  const [ locked, setLocked ] = useState( false )
  const game = useSelector( state => state.game )

  const updateRound = ( round ) => updateGame( { ...game, round } )
  const updateLetter = ( letter ) => updateGame( { ...game, letter } )

  if ( game.round === 0 ) return <Instructions updateRound={updateRound} />
  else if ( game.round % 2 === 0 ) return <Board locked={locked} updateRound={updateRound} />
  else return <LetterSelect updateLetter={updateLetter} updateRound={updateRound} />

}
export default Scattergories;