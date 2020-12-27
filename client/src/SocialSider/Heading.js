import React, { useState } from 'react';
import { useSelector, } from 'react-redux';
import { Typography, Row, Button } from 'antd'
import { DEV_CLIENT_BASE } from '../utils/config'
const { Title } = Typography

const titleRow = { height: 55, borderBottom: '1px solid #00000026', alignItems: 'center' }
const idLabel = { color: '#00000073', fontWeight: 200, marginBottom: 0 }
const idStyle = { color: '#FF006E', fontWeight: 600, marginLeft: 20 }
const copyBtn = {
  fontSize: 12, padding: '0px 3px', marginLeft: 5, color: '#00000059', lineHeight: 0
}

const Heading = () => {
  const [ copied, setCopied ] = useState( false );
  const room = useSelector( state => state.room );


  const copyText = () => {
    navigator.clipboard.writeText( `${ DEV_CLIENT_BASE }/${ room.id }` )
    setCopied( true )
  }

  return (
    <Row type='flex' justify='center' style={titleRow}>
      <Title level={4} style={idLabel}>
        room id:
      <span id='roomid' value={room.id} style={idStyle}>{room.id}</span>
        <Button style={copyBtn} size='small' onClick={() => copyText()}>
          {copied ? 'copied!' : 'copy'}
        </Button>
      </Title>
    </Row>
  )
}
export default Heading