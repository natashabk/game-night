import React from 'react';
import { useSelector } from 'react-redux'
import { Layout, Typography, } from 'antd';
import { ReactComponent as Logo } from './icons/svg/logo.svg';
const { Header } = Layout;
const { Title, Text } = Typography;

const headerStyle = { background: 'none', height: 80, lineHeight: 'unset', textAlign: 'center' }
const titleStyle = {
  color: 'white',
  textAlign: 'center',
  maxWidth: 1300,
  marginBottom: 0,
  fontSize: 40,
  fontWeight: 400
}
const subtitleStyle = { color: 'white', padding: 5, borderRadius: 3 }

const TopHeader = () => {
  const err = useSelector( state => state.error );
  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );

  const subtitle = () => {
    if ( err ) {
      return <Text style={{ ...subtitleStyle, background: '#FF006E' }}>Error: {err.error}</Text>
    } else if ( room && room.name && username ) {
      return ( //only show this after the username form
        <Text style={subtitleStyle}>
          Room: <span style={{ fontWeight: 600 }}>{room.name}</span>
        </Text>
      )
    } else return null
  }

  return (
    <Header style={{ ...headerStyle, zIndex: 1 }}>
      <Title level={1} style={titleStyle}>
        G<Logo style={{ height: 40, width: 40 }} />ME NIGHT</Title>
      {subtitle()}
    </Header>
  )
}
export default TopHeader;