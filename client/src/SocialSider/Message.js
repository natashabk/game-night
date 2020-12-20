import React from 'react';
import { Typography, Row } from 'antd'
import { icons } from '../icons/svg';
const { Text } = Typography

const Message = ( { msg, idx } ) => {
  if ( msg.message === 'has entered the chat' ) {
    return (
      <Row type='flex' justify='center' style={{ paddingBottom: 5 }}>
        <Text type='secondary'>{msg.username}  {msg.message}!</Text>
      </Row>
    )
  } else return (
    <Row type='flex' style={{ paddingBottom: 5 }}>
      <Text strong style={{ wordBreak: 'break-all' }}>
        <div style={{ height: 20, width: 20, display: 'inline-flex', marginRight: 3 }}>
          {msg.avatar && icons[ msg.avatar ]}
        </div>
        {msg.username}:
          <span style={{ fontWeight: 200, marginLeft: 5, wordBreak: 'break-word' }}>{msg.message}</span>
      </Text>
    </Row>
  )
}

export default Message