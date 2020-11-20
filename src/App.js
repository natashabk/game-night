import React, { useState } from 'react';
import { Layout, Typography, } from 'antd';
import RoundSelect from './RoundSelect';
import WordTable from './WordTable';
import Instructions from './Instructions';
import Timer from './Timer';
import Scoreboard from './Scoreboard';
const { Header, Sider, Content } = Layout;
const { Title, } = Typography;

const noBg = { background: 'none' }

const App = () => {
  const [ round, setRound ] = useState( 0 )
  const [ letter, setLetter ] = useState( '-' )
  const [ locked, setLocked ] = useState( false )
  const [ scores, setScores ] = useState()

  const content = () => {
    if ( round ) return <WordTable round={round} locked={locked} />
    else if ( round === 0 ) return <Instructions letter={letter} setLetter={setLetter} />
    else return <Scoreboard scores={scores} setScores={setScores} />
  }

  return (
    <Layout style={noBg}>
      <Header style={{ ...noBg, marginTop: 30 }}>
        <Title level={1} style={{ color: 'white', textAlign: 'center' }}>SCATTERGORIES</Title>
      </Header>
      <Layout style={noBg}>
        <Sider style={{ background: 'none', marginTop: 30 }}>
          <div style={{ position: 'fixed' }}>
            <RoundSelect round={round} setRound={setRound} setLocked={setLocked} />
            {round ?
              <Timer
                size={110}
                fontSize={20}
                minutes={1.5}
                fillColor={'#65b0d3'}
                bgColor={'white'}
                showMs={false}
                onComplete={() => setLocked( true )}
                completeMsg={'✓'}
                running={true}
                timeAtLoad={Date.now()}
              /> : null
            }
          </div>
        </Sider>
        <Content style={{ padding: 30 }}>{content()}</Content>
      </Layout>
    </Layout>
  )
}
export default App;