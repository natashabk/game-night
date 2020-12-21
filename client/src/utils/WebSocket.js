import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { updateChatLog, updatePlayers, updateScore } from './actions';

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
    ws = { socket: socket, sendMessage, addPlayer, changeScore }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}