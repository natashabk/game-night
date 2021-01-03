import React from 'react';
import { Typography, Button } from 'antd';
const { Text, Title } = Typography;

const Instructions = ( { updateRound } ) => {
  return (
    <div style={{ maxWidth: 650, marginTop: 100 }}>
      <Title level={2} style={{ color: '#fff' }}>Instructions</Title>
      <Text style={{ fontSize: 18, color: 'white' }}>
        1. At the beginning of the game, you will be presented with a list of categories, and a blank space next to it for your answer.<br /><br />
        2. You will have two minutes to fill in as many of the answers as you can. Each answer has to start with the letter that is randomly selected before the round begins.<br /><br />
        3. Scoring: At the end of the round, each player will read their answers aloud. If their answer is unique and the rest of the group agrees that it matches the category, they get one point. If any other player came up with the same answer for that question, they both receive zero points.<br /><br />
      </Text>
      <Button
        style={{ margin: '50px auto' }}
        onClick={() => updateRound( 1 )}
        type='primary'
      >
        Start game
      </Button>
    </div>
  )
}

export default Instructions;