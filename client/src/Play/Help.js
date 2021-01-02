import React from 'react';
import { Typography, Row, Card, Button } from 'antd';
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Text, Title } = Typography;
const bold = { fontWeight: 600 }
const labelStyle = { ...bold, color: '#fff' }
const gameCard = { width: 650, background: '#ffffff4d', marginBottom: 20 }
const linkBtn = { ...bold, padding: 0, fontSize: 16, height: 'unset', paddingLeft: 3 }
const repoLink = 'https://github.com/natashabuck/game-night'


const Help = ( { setHelpOpen } ) => {
  const roomId = useSelector( state => state.room.id );
  const faq = [
    {
      label: ' What is this? ',
      text: "Game Night started in 2020 for people of all ages and technical abilities to have fun with their long-distance families and friends. If you have feedback or want to contribute to the codebase, you can find the project"
    },
    {
      label: ' How to invite people: ',
      text: `Copy the link straight from your browser or use the copy button next to your room id above the chat. If there's trouble with the link, they can enter the id themselves on the initial login screen. Your room id is ${ roomId }`,
    },
    {
      label: ' Once everyone in your party is here: ',
      text: "Select a game from the menu below to get started. The ideal setup is for you to be on a video call with everyone in your group (using Zoom, FaceTime, Hangouts, or anything else) and to interact with Game Night in a separate window."
    },
    {
      label: ' If you can\'t get on a video call: ',
      text: " All games are manageable without video, although live reactions make it a lot more fun! There will be in-game tips for anyone in the group who needs to work around it."
    }
  ]

  const styleText = ( text ) => {
    if ( text.includes( roomId ) ) {
      const id = text.substring( text.length - 7 )
      return ( <>{text.substring( 0, text.length - 7 )}<span style={bold}>{id}</span>.</> )
    }
    else if ( text.includes( 'project' ) ) {
      return (
        <>
          {text}
          <Button type='link' style={linkBtn} href={repoLink} target="_blank">here.</Button>
        </>
      )
    }
    else return text;
  }

  return (
    <Card bordered={false} style={gameCard}>
      <Row type='flex' justify='space-between'>
        <Title level={3} style={{ color: '#fff' }}>FAQ</Title>
        <Button style={{ color: '#fff', background: 'none', border: 'none' }} onClick={() => setHelpOpen( false )} icon={<CloseOutlined />} />
      </Row>
      {faq.map( q => {
        return (
          <Row key={q.label} style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 16 }}>
              <span style={labelStyle}><QuestionCircleFilled />{q.label}</span>
              {styleText( q.text )}
            </Text>
          </Row>
        )
      } )}
    </Card>
  )
}

export default Help;