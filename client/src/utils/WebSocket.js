import React, { createContext } from 'react'
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { updateChatLog, updatePlayers, updateScore, updateGame } from './actions';
const WS_BASE = process.env.REACT_APP_WS_BASE
const WebSocketContext = createContext( null )

export { WebSocketContext }

export default ( { children } ) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = ( room, username, avatar, message ) => {
    const payload = { room, data: { username, avatar, message } }
    socket.emit( "event://send-message", JSON.stringify( payload ) );
    //for the user who sent the message - display your msg to yourself as it shows to others
    dispatch( updateChatLog( payload ) );
  }

  const addPlayer = ( room, username, avatar ) => {
    const payload = { room, data: { username, avatar } }
    socket.emit( "event://add-player", JSON.stringify( payload ) );
  }

  const changeScore = ( roomId, playerIdx, score ) => {
    const payload = { roomId, playerIdx, score }
    socket.emit( "event://update-score", JSON.stringify( payload ) )
    dispatch( updateScore( payload ) )
  }

  const changeGame = ( roomId, game ) => {
    const payload = { roomId, game }
    socket.emit( "event://update-game", JSON.stringify( payload ) );
    dispatch( updateGame( payload ) )
  }

  if ( !socket ) {
    socket = io.connect( WS_BASE )
    socket.on( "event://get-message", ( resp ) => {
      const payload = JSON.parse( resp );
      dispatch( updateChatLog( payload ) );
    } )
    socket.on( "event://get-player", ( resp ) => {
      const payload = JSON.parse( resp );
      dispatch( updateChatLog( payload ) );
      dispatch( updatePlayers( payload ) )
    } )
    socket.on( "event://get-score", ( resp ) => {
      const payload = JSON.parse( resp )
      dispatch( updateScore( payload ) )
    } )
    socket.on( "event://get-game", ( resp ) => {
      const payload = JSON.parse( resp )
      dispatch( updateGame( payload ) )
    } )
    ws = { socket: socket, sendMessage, addPlayer, changeScore, changeGame }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}