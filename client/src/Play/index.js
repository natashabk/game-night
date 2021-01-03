import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { WebSocketContext, bgSpin } from '../utils';
import Scattergories from './Scattergories'
import GameMenu from './GameMenu'
const Play = () => {
  const roomId = useSelector( state => state.room.id );
  const currentGame = useSelector( state => state.game );
  const ws = useContext( WebSocketContext );

  const handleGameUpdate = ( game ) => { ws.changeGame( roomId, game ) }

  bgSpin( 'stop' );

  if ( currentGame && currentGame.name === 'Scattergories' ) {
    return <Scattergories updateGame={handleGameUpdate} />
  }
  return <GameMenu updateGame={handleGameUpdate} />
}
export default Play;