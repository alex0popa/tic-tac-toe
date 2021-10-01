import { Avatar, Button, Row } from "antd";
import {
  BackwardOutlined,
  ForwardOutlined,
  ReloadOutlined,
  SyncOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

import { useGameContext } from "./GameContext";

const styleGrid = {
  display: 'grid',
  gridTemplateColumns: '100px 100px 100px',
  gridGap: '10px',
  margin: '10px',
  height: '100px'
};

const styleButton = {
  fontSize: '30px',
  color: 'brown',
  borderRadius: '20%',
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
};

export const Game = () => {
  const {
    changePlayers,
    history,
    historyPoint,
    isPlayersSet,
    mark,
    moveHistoryTo,
    playerO,
    playerX,
    resetScore,
    switchPlayers,
    scoreO,
    scoreX,
    setMove,
    str
  } = useGameContext();

  const grid = Array(3).fill(null).map((_, i) =>
    <div style={styleGrid} key={'line_' + i}>
      {Array(3).fill(null).map((_, j) => 
        <button
          key={i * 3 + j}
          onClick={_ => setMove(i * 3 + j)}
          style={styleButton}
        >
          <Avatar size={60} style={{
            backgroundColor: str[i * 3 + j] === 'O' ? '#7265e6' : str[i * 3 + j] === 'X' ? '#f56a00' : 'transparent',
            verticalAlign: 'middle',
            marginLeft: '5px',
            boxShadow: str[i * 3 + j] !== ' ' ? '0 3px 10px rgb(0 0 0 / 0.2)': '',
            fontWeight: 'bolder',
            fontSize: '25px',
            color: str[i * 3 + j] === ' ' ? 'navy' : ''
          }}>
            {str[i * 3 + j]} 
          </Avatar>
        </button>
      )}
    </div>
  );

  return (
    <>
      {isPlayersSet && (
        <>
          <p>{`${playerX} - ${scoreX}`}</p>
          <p>{`${playerO} - ${scoreO}`}</p>
          <Row align="middle" justify="space-between">
            <Button
              disabled={historyPoint === 0}
              value={-1}
              style={{
                marginRight: '60px',
                backgroundColor: 'limegreen',
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                fontWeight: 'bolder'
              }}
              type="primary"
              shape="round"
              icon={<BackwardOutlined />}
              onClick={moveHistoryTo}
            />
            <Avatar size={60} style={{
              backgroundColor: mark === 'O' ? '#7265e6' : '#f56a00',
              boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
              fontWeight: 'bolder',
              fontSize: '25px',
            }}>
              {mark} 
            </Avatar>
            <Button
              disabled={historyPoint === history.length - 1}
              value={1}
              style={{
                marginLeft: '60px',
                backgroundColor: 'limegreen',
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                fontWeight: 'bolder'
              }}
              type="primary"
              shape="round"
              icon={<ForwardOutlined />}
              onClick={moveHistoryTo}
            />
          </Row>
          <div>{grid}</div>
          <Button
            type="primary"
            shape="round"
            icon={<UserSwitchOutlined />}
            onClick={changePlayers}
          >
            Change players
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<ReloadOutlined />}
            onClick={resetScore}
          >
            Reset score
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<SyncOutlined />}
            onClick={switchPlayers}
          >
            Switch players
          </Button>
        </>
      )}
    </>
  );
};
