import React, { useState, useEffect } from 'react'
import { Input, InputNumber, Row, Typography, Avatar, Button } from 'antd';
import { RobotOutlined, BugOutlined, HeartOutlined, ThunderboltOutlined, RocketOutlined } from '@ant-design/icons';
const { Text } = Typography;

const icons = [
  <BugOutlined />,
  <HeartOutlined />,
  <ThunderboltOutlined />,
  <RocketOutlined />,
  <RobotOutlined />
]
const bgColors = [ '#ffc107', '#4caf50', '#673ab7', '#795548', '#00bcd4' ]

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '50px',
  fontWeight: '600',
  justifyContent: 'space-between',
  maxWidth: 300,
}

const Scoreboard = ( { scores, setScores } ) => {
  const onChange = ( newScore ) => {
    console.log( newScore )
  }

  const newPlayer = ( input ) => {
    console.log( 'newPlayer run' )
    let newScores = scores || []
    newScores.push( { name: input.target.value, score: 0 } )
    setScores( newScores )
  }

  const scoreList = () => {
    if ( scores ) return scores.map( ( person, idx ) => (
      <Row style={rowStyle}>
        <Avatar style={{ background: bgColors[ idx ] }} icon={icons[ idx ]} />
        <Text style={{ color: 'white', fontSize: 20 }}>{person.name}</Text>
        <InputNumber defaultValue={person.score} onChange={onChange} id={idx} />
      </Row>
    ) )
  }

  return (
    <>
      <Text style={{ color: 'white' }}>
        To add a player, type their name below and press Enter.
      </Text>
      <br />
      <Input placeholder='First name' onPressEnter={newPlayer} style={{ maxWidth: 358 }} allowClear />
      {scoreList()}
    </>
  )
}
export default Scoreboard;