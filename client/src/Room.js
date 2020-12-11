import React, { useState, useContext } from 'react';
import { useSelector, } from 'react-redux'
import { WebSocketContext } from './utils';

const Chat = () => {
  const [ msgInput, setMsgInput ] = useState( "" );

  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const chats = useSelector( state => state.chatLog );

  const ws = useContext( WebSocketContext );

  const sendMessage = () => {
    ws.sendMessage( room.id, {
      username: username,
      message: msgInput
    } );
  }

  return (
    <div>
      <h3>{room.name} ({room.id})</h3>
      <div className="room">
        <div className="history" style={{ width: "400px", border: "1px solid #ccc", height: "500px", textAlign: "left", padding: "10px", overflow: "scroll", background: 'white' }}>
          {chats.map( ( c, i ) => (
            <div key={i}><i>{c.username}:</i> {c.message}</div>
          ) )}
        </div>
        <div className="control">
          <input type="text" value={msgInput} onChange={( e ) => setMsgInput( e.target.value )} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat