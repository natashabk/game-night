import React, { useState, useEffect } from 'react';
import { Table, Input, Typography, Checkbox } from 'antd';
const { Text, Title } = Typography

const categories = [
  [
    'animals',
    'girl\'s name',
    'country',
    'four letter word',
    'occupation',
    'something you see in London',
    'things in the sky',
    'activity you did today',
    'something that rhymes with "blue"',
    'activities in a casino',
    'bad qualities of a person',
    'something made of glass',
    'sport played inside',
    'university majors',
    'something you never want to eat',
  ],
  [
    'something you see in France',
    'tv show title',
    'tech companies',
    'illegal activities',
    'underground animal',
    'industries that don\'t exist anymore',
    'uncomfortable name to call your partner in bed',
    'famous woman',
    'internet slang',
    'type of dessert',
    'historical dictators',
    'holidays',
    'something that rhymes with "light"',
    'something/someone controversial',
    'bands from the 90s/00s',
  ],
  [
    'old person activities',
    'large body of water',
    'adjectives',
    'something you only hear at work',
    'something painful',
    'sandwich ingredient',
    'boy\'s name',
    'body part',
    'a word in a language not English/French/Polish',
    'current leader of a country',
    'apps on your phone right now',
    'fruits',
    'cool nickname',
    'something you find in the bath/shower',
    'clothing you wear for special occasions',
  ],
  [
    'colors',
    'teenager activities',
    'something related to magic',
    'candy',
    'really good restaurant',
    'famous man',
    'something you see on a farm',
    'something you don\'t talk to coworkers about',
    'sport/game played outside',
    'something you throw at someone',
    'fears',
    'music genres',
    'cities',
    'words you hear on the weather channel',
    'board games',
  ],
  [
    'movies',
    'something you see in the zoo',
    'something you might say while high',
    'something you might say to convince someone that you\'re not high',
    'video games',
    'band/musician',
    'something that rhymes with "door"',
    'capital of a country',
    'fast food restaurant',
    'an object in the room you\'re in right now',
    'breakfast food',
    'item of clothing',
    'good qualities of a person',
    'something you find in a science textbook',
    'plants',
  ],
  [
    'excuse for being late',
    'something you see in Poland',
    'occupations',
    'movie genre',
    'alcoholic drink',
    'illegal substances',
    'something you find on an airplane',
    'places you don\'t want to go',
    'something in the ocean',
    'sports team',
    'main character in a book',
    'weird hobbies',
    'something more important than money',
    'something you put on a desk',
    'something you sit on',
  ],
]

const header = { fontWeight: 600, fontSize: 20, color: '#b67d94', }

const WordTable = ( { round, locked } ) => {
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
      {locked ? <Title level={1} style={{ color: 'white', textAlign: 'center' }}>ROUND TOTAL: {total}</Title> : null}

    </>
  )
}


export default WordTable;
