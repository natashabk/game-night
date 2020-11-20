import { Radio } from 'antd';

const RoundSelect = ( { round, setRound } ) => {
  return (
    <Radio.Group
      style={{ display: 'inline-grid', marginBottom: 30 }}
      value={round} onChange={( e ) => setRound( e.target.value )}
    >
      <Radio.Button value={0}>Instructions</Radio.Button>
      <Radio.Button value={1}>Round 1</Radio.Button>
      <Radio.Button value={2}>Round 2</Radio.Button>
      <Radio.Button value={3}>Round 3</Radio.Button>
      <Radio.Button value={4}>Round 4</Radio.Button>
      <Radio.Button value={5}>Round 5</Radio.Button>
      <Radio.Button value={6}>Round 6</Radio.Button>
      <Radio.Button value={false}>Scoreboard</Radio.Button>
    </Radio.Group>
  );
}

export default RoundSelect; 