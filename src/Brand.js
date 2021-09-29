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
  marginBottom: 0,
  fontSize: 40,
  fontWeight: 400
}
const subtitleStyle = { color: 'white', padding: 5, borderRadius: 3 }

const Brand = ( { gameMode } ) => {
  const err = useSelector( state => state.error );

  const subtitle = () => {
    if ( err ) {
      return <Text style={{ ...subtitleStyle, background: '#FF006E' }}>Error: {err.error}</Text>
    } else return null
  }

  if ( gameMode ) return <Logo style={{ height: 40, width: 40, margin: '-10px 0px 10px' }} />

  return (
    <Header style={{ ...headerStyle, zIndex: 1 }}>
      <Title level={1} style={titleStyle}>
        G<Logo style={{ height: 40, width: 40 }} />ME NIGHT</Title>
      {subtitle()}
    </Header>
  )
}
export default Brand;