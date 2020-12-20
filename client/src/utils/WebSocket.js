import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { updateChatLog, updateRoom } from './actions';

const WebSocketContext = createContext( null )

export { WebSocketContext }

export default ( { children } ) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = ( roomId, message ) => {
    const payload = { roomId, data: message }
    socket.emit( "event://send-message", JSON.stringify( payload ) );
    dispatch( updateChatLog( payload ) );
  }

  const addPlayer = ( roomId, username, avatar ) => {
    const payload = { roomId, data: { username, avatar, message: 'has entered the chat' } }
    socket.emit( "event://add-player", JSON.stringify( payload ) );
    dispatch( updateChatLog( payload ) );
  }

  if ( !socket ) {
    socket = io.connect( WS_BASE )
    socket.on( "event://get-message", ( msg ) => {
      const payload = JSON.parse( msg );
      dispatch( updateChatLog( payload ) );
    } )
    socket.on( "event://get-player", ( resp ) => {
      const payload = JSON.parse( resp );
      dispatch( updateChatLog( { roomId: payload.room.id, data: payload.data } ) );
      dispatch( updateRoom( { newPlayers: payload.room.players } ) )
    } )
    ws = { socket: socket, sendMessage, addPlayer }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}