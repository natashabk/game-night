import React, { useState, useContext } from 'react';
import { useSelector, } from 'react-redux'
import { Typography, Row } from 'antd'
import { WebSocketContext } from './utils';
import { icons } from './icons/svg';

const { Text } = Typography

const Chat = () => {
  const [ msgInput, setMsgInput ] = useState( "" );

  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const chats = useSelector( state => state.chatLog );

  const ws = useContext( WebSocketContext );

  const sendMessage = () => {
    ws.sendMessage( room.id, {
      username: username,
      avatar: avatar,
      message: msgInput
    } );
  }

  return (
    <div>
      <h3>{room.name} ({room.id})</h3>
      <div className="room">
        <div className="history" style={{ width: "400px", border: "1px solid #ccc", height: "500px", textAlign: "left", padding: "10px", overflow: "scroll", background: 'white' }}>
          {chats.map( ( c, i ) => (
            <Row key={i} type='flex'>
              <div style={{ height: 20, width: 20 }}>
                {icons[ c.avatar ]}
              </div>
              <Text style={{ textTransform: 'uppercase', fontWeight: 600 }}>{c.username}: </Text>
              <Text>{c.message}</Text>
            </Row>
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