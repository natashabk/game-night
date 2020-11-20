import React from 'react';
import { Typography, Row, Button, Divider } from 'antd';
const { Text } = Typography;

const letterBox = {
  background: 'white',
  height: 31,
  width: 31,
  marginLeft: 5,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomCharacter = () => alphabet[ Math.floor( Math.random() * alphabet.length ) ]

const Instructions = ( { letter, setLetter } ) => (
  <Row style={{ maxWidth: 600, marginLeft: '8%' }}>
    <Text style={{ fontSize: 18, color: 'white' }}>
      1. At the beginning of the game, you will be presented with a list of categories, and a blank space next to it for your answer.<br /><br />
      2. You will have 1.5 minutes to fill in as many of the answers as you can. Each answer has to start with the letter that is randomly selected before the round begins.<br /><br />
      3. When you are ready to start, click on one of the rounds in the left menu. Make sure everyone on the call is starting at the same time!<br /><br />
      4. Scoring: At the end of the round, each player will read their answers aloud. If their answer is unique and the rest of the group agrees that it matches the category, they get one point. If any other player came up with the same answer for that question, they both receive zero points.<br /><br />
      5. One (or two) people should be the scorekeeper (the last item on the menu). Add everyone's names and update it at the end of each round.
  </Text>
    <Divider />
    <Row style={{ margin: 'auto' }}>
      <Button onClick={() => setLetter( randomCharacter() )}>Select Random Letter</Button>
      <div style={letterBox}>
        {letter}
      </div>
    </Row>
  </Row>
)

export default Instructions;