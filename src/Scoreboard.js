import React, { useState } from 'react'
import { Input, InputNumber, Row, Typography, Avatar, Divider } from 'antd';
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
  const [ value, setValue ] = useState( '' )


  const onScoreChange = ( newScore, name, idx ) => {
    const scoreObject = {
      name: name,
      score: newScore
    }
    let newScores = [ ...scores ]
    newScores[ idx ] = scoreObject
    setScores( newScores )
  }

  const newPlayer = ( input ) => {
    const scoreObject = {
      name: input.target.value,
      score: 0
    }
    let newScores = [ ...scores, scoreObject ]
    setScores( newScores )
    setValue( '' )
  }

  const scoreList = () => {
    return scores.map( ( person, idx ) => (
      <Row style={rowStyle} key={person.name}>
        <Avatar style={{ background: bgColors[ idx ] }} icon={icons[ idx ]} />
        <Text style={{ color: 'white', fontSize: 20 }}>{person.name}</Text>
        <InputNumber
          defaultValue={person.score}
          onChange={( val ) => onScoreChange( val, person.name, idx )} id={idx}
        />
      </Row>
    ) )
  }

  return (
    <>
      <Text style={{ color: 'white' }}>
        To add a player, type their name below and press Enter.
      </Text>
      <br />
      <Input
        placeholder='First name'
        onPressEnter={newPlayer}
        onChange={( e ) => setValue( e.target.value )}
        alue={value}
        style={{ maxWidth: 358 }}
        allowClear
      />
      <Divider />
      {scoreList()}
    </>
  )
}
export default Scoreboard;