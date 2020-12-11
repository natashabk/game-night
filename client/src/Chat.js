import React, { useState, useContext, useEffect } from 'react';
import { useSelector, } from 'react-redux'
import { Typography, Row, Input, Button, Col } from 'antd'
import { WebSocketContext } from './utils';
import { icons } from './icons/svg';

const { Text } = Typography

const Chat = () => {
  const [ msgInput, setMsgInput ] = useState( '' );

  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const chats = useSelector( state => state.chatLog );
  const players = useSelector( state => state.players );

  useEffect( () => {
    console.log( players )
  }, [ players ] )

  const ws = useContext( WebSocketContext );

  const sendMessage = () => {
    ws.sendMessage( room.id, {
      username: username,
      avatar: avatar,
      message: msgInput
    } );
    setMsgInput( '' )
  }

  const displayMessage = ( msg, idx ) => {
    if ( msg.message === 'has entered the chat' ) {
      return (
        <Row key={idx} type='flex'>
          <Text type='secondary'>{msg.username}  {msg.message}!</Text>
        </Row>
      )
    } else return (
      <Row key={idx} type='flex'>
        <div style={{ height: 20, width: 20 }}>
          {msg.avatar && icons[ msg.avatar ]}
        </div>
        <Text strong >{msg.username}: </Text>
        <Text style={{ lineBreak: 'anywhere' }}> {msg.message}</Text>
      </Row>
    )
  }

  return (
    <div>
      <h3>{room.id}</h3>
      <div className='chatBox'>
        <div style={{ height: "500px", padding: "10px", background: 'white' }}>
          {chats.map( ( msg, idx ) => ( displayMessage( msg, idx ) ) )}
        </div>
      </div>
      <Row>
        <Col span={20}>
          <Input
            value={msgInput}
            onChange={( e ) => setMsgInput( e.target.value )}
            onPressEnter={sendMessage}
          />
        </Col>
        <Button type='primary' onClick={sendMessage}>Send</Button>
      </Row>
    </div>
  )
}

export default Chat