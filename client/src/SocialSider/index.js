import React from 'react';
import { Collapse } from 'antd'
import Heading from './Heading';
import ScoreBoard from './Scoreboard';
import Chat from './Chat';
const { Panel } = Collapse;

const SocialSider = () => {
  return (
    <>
      <Heading />
      <Collapse defaultActiveKey={[ '1' ]} accordion={true}>
        <Panel header="Scoreboard" key="1">
          <ScoreBoard />
        </Panel>
        <Panel header="Chat" key="2">
          <Chat />
        </Panel>
      </Collapse>
    </>
  )
}

export default SocialSider