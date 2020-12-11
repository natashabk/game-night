import React, { useState } from 'react';
import { Table, Input, Typography, Checkbox } from 'antd';
import { categories } from './const'
const { Text, Title } = Typography

const header = { fontWeight: 600, fontSize: 20, color: '#b67d94', }

const Board = ( { round, locked } ) => {
  const [ total, setTotal ] = useState( 15 )

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
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        style={{ maxWidth: 'fit-content' }}
      />
      {locked ? <Title level={1} style={{ color: 'white', textAlign: 'center', maxWidth: 1300 }}>ROUND TOTAL: {total}</Title> : null}
    </>
  )
}


export default Board;
