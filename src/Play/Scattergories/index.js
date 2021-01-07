import React from 'react';
import { useSelector } from 'react-redux';
import Board from './Board';
import Instructions from './Instructions';
import LetterSelect from './LetterSelect';

const Scattergories = ( { updateGame } ) => {
  const game = useSelector( state => state.game )

  const updateLetter = ( letter ) => updateGame( { ...game, letter } )
  const updateRound = ( round ) => {
    if ( round < 13 ) updateGame( { ...game, round } )
    else updateGame( null )
  }

  if ( game.round === 0 ) return <Instructions updateRound={updateRound} />
  else if ( game.round % 2 === 0 ) return <Board updateRound={updateRound} />
  else return <LetterSelect updateLetter={updateLetter} updateRound={updateRound} />

}
export default Scattergories;