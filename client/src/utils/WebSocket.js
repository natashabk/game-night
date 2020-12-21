import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import { updateChatLog, updatePlayers } from './actions';

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
    //for the user who just joined - display your msg to yourself as it shows to others
    // const newPlayerMsg = 'has entered the chat'
    // dispatch( updateChatLog( { ...payload, data: { ...payload.data, message: newPlayerMsg } } ) );
  }

  if ( !socket ) {
    socket = io.connect( WS_BASE )
    socket.on( "event://get-message", ( msg ) => {
      const payload = JSON.parse( msg );
      dispatch( updateChatLog( payload ) );
    } )
    socket.on( "event://get-player", ( resp ) => {
      const payload = JSON.parse( resp );
      dispatch( updateChatLog( payload ) );
      dispatch( updatePlayers( payload ) )
    } )
    ws = { socket: socket, sendMessage, addPlayer }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}