import React, { useState, useContext } from 'react';
import { useSelector, } from 'react-redux'
import { Row, Input, Button, Col } from 'antd'
import { WebSocketContext } from '../utils';
import Message from './Message';

const Chat = () => {
  const [ message, setMessage ] = useState( '' );

  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const chats = useSelector( state => state.chatLog );

  const ws = useContext( WebSocketContext );

  const sendMessage = () => {
    ws.sendMessage( room, username, avatar, message )
    setMessage( '' )
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className='chatBox'>
        <Col style={{ padding: "10px" }}>
          {chats ? chats.map( ( msg, idx ) => <Message key={idx} msg={msg} /> ) : null}
        </Col>
      </div>
      <Row style={{ height: 32, display: 'flex' }}>
        <Col span={19} style={{ marginRight: -2 }}>
          <Input
            value={message}
            onChange={( e ) => setMessage( e.target.value )}
            onPressEnter={sendMessage}
          />
        </Col>
        <Col span={5} style={{ marginRight: 2 }}>
          <Button type='primary' onClick={sendMessage}>Send</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Chat