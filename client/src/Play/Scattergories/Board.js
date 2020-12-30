import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Input, Typography, Checkbox, Button } from 'antd';
import { categories } from './const'
const { Text, Title } = Typography

const header = { fontWeight: 600, fontSize: 20, color: '#b67d94', }

const Board = ( { locked, updateRound } ) => {
  const [ total, setTotal ] = useState( 15 )
  const round = useSelector( state => state.game.round );

  const handlePointChange = ( e ) => {
    const point = e.target.checked
    if ( point ) setTotal( total + 1 )
    else setTotal( total - 1 )
  }
  const data = categories[ round - 1 ].map( word => ( { key: word, category: word } ) )
  const columns = [
    {
      title: <Text style={header}>Category</Text>,
      dataIndex: 'category',
      width: 400,
      align: 'right'
    },
    {
      title: <Text style={{ ...header, color: '#65b0d3' }}>Answer</Text>,
      dataIndex: 'answer',
      width: 500,
      render: () => <Input allowClear disabled={locked} />
    },
    {
      title: 'Point',
      dataIndex: 'point',
      render: () => {
        return ( <Checkbox disabled={!locked} defaultChecked={true} onChange={handlePointChange} /> )
      }
    }
  ];

  return (
    <>
      {categories[ round - 1 ].map( word => (
        <Row>
          <Col span={18} style={{ textAlign: 'right' }}>{word}</Col>
          <Col span={6}><Input allowClear disabled={locked} /></Col>
          {locked && <Col>Point?</Col>}
        </Row>
      ) )}
      {locked ? <Title level={1} style={{ color: 'white', textAlign: 'center', maxWidth: 1300 }}>ROUND TOTAL: {total}</Title> : null}
      <Button style={{ margin: '50px auto' }} onClick={() => updateRound( round + 1 )}>Next Round</Button>
    </>
  )
}


export default Board;
