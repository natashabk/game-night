import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Row } from 'antd';
import CreateOrJoinRoom from './CreateOrJoinRoom'
import CreateUserName from './CreateUsername'

export const lightWhite = '#ffffff38'
export const inputStyle = { maxWidth: 400, minWidth: 200 }
export const btnStyle = { height: 40, width: 75 }

const SignIn = () => {
  const username = useSelector( state => state.username );
  return (
    <Row justify={'center'}>
      <Card style={{ width: 550, background: lightWhite }}>
        {username ? <CreateOrJoinRoom /> : <CreateUserName />}
      </Card>
    </Row>
  );
}

export default SignIn;