import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Timer from 'simple-circle-timer'
import { Row, Col, Typography, Card, Button, Popconfirm } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { Text, Title } = Typography
const cardStyle = { background: '#ffffff4d', marginBottom: 20, width: 200, position: 'fixed' }

const LetterClock = ( { locked, setLocked, updateRound } ) => {
  const [ confirmOpen, setConfirmOpen ] = useState( false )
  const game = useSelector( state => state.game );

  const nextRound = () => {
    updateRound( game.round + 1 )
    setConfirmOpen( false )
    setLocked( false )
  }

  return (
    <>
      <Card style={cardStyle} bodyStyle={{ padding: 16 }}>
        <Row justify='center' style={{ textAlign: 'center' }}>
          <Title level={3} style={{ color: '#fff' }}>Round {game.round / 2}</Title>
        </Row>
        <Row type='flex' justify='space-between' style={{ alignItems: 'center' }}>
          <Col style={{ textAlign: 'center', marginTop: -10 }}>
            <Text style={{ color: '#fff' }}>Letter</Text>
            <Title level={1} style={{ background: '#FF006E', margin: 0, borderRadius: 4, textAlign: 'center', fontSize: 45, padding: '0px 10px', color: '#fff' }}>
              {game.letter}
            </Title>
          </Col>
          <Timer
            size={80}
            fontSize={20}
            minutes={2}
            fillColor={'#FF006E'}
            onComplete={() => setLocked( true )}
          />
        </Row>
      </Card>
      {locked &&
        <Card style={{ ...cardStyle, top: 200, width: 250 }} bodyStyle={{ padding: 16 }}>
          <Row justify='center' style={{ textAlign: 'center' }}>
            <Title level={3} style={{ color: '#fff' }}>Time's up!</Title>
          </Row>
          <Text style={{ color: '#fff' }}>Take turns reading your answers out loud to the other players.<br /><br /> If your answer is unique, check the box next to it to get a point. If another player has the same answer, or they don't think your answer qualifies, uncheck it.<br /><br />
      When everyone is done and happy with their scores, click the button below to {game.round === 12 ? 'end the game.' : 'move onto the next round.'}
          </Text>
          <Row justify='center' style={{ marginTop: 30 }}>
            <Popconfirm
              title={
                <Row style={{ maxWidth: 250 }}>Are you sure that everyone's scores are correct and your group is ready to move to the next round?</Row>
              }
              icon={<ExclamationCircleFilled style={{ color: '#FF006E' }} />}
              visible={confirmOpen}
              onConfirm={() => nextRound()}
              onCancel={() => setConfirmOpen( false )}
              okText="Yes"
              cancelText="Back"
            >
              <Button type='primary' onClick={() => setConfirmOpen( true )}>
                {game.round === 12 ? 'End game' : 'Next round'}
              </Button>
            </Popconfirm>
          </Row>
        </Card>
      }
    </>
  )
}


export default LetterClock;
