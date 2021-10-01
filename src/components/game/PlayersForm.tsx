import { Avatar, Button, Col, Row, Switch } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useGameContext } from './GameContext';

const style = {
  display: 'grid',
  gridGap: '10px',
  margin: '10px',
  height: '150px',
};

type Form = { playerX: string; playerO: string };

export const PlayersForm = () => {
  const { addPlayers, isPlayersSet, playerO, playerX } = useGameContext();
  const [form, setForm] = useState<Form>({ playerX, playerO });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.playerX === form.playerO ? ( 
      alert('Players must have different names!')
    ) : (
      addPlayers({ ...form })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const switchPlayersName = () => setForm(
    ({ playerX, playerO }) => ({ playerO: playerX, playerX: playerO })
  )

  return (
    <>
      {
        !isPlayersSet && (
          <form style={style} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{
                  height: '30px',
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                  borderRadius: '0%'
                }}
                placeholder="Player 1"
                name="playerX"
                value={form.playerX}
                onChange={handleChange}
              />
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                  verticalAlign: 'middle',
                  marginLeft: '5px',
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
                }}
              >
                {'X'}
              </Avatar>
            </div>
            <Button
              icon={<SyncOutlined />}
              type="primary"
              shape="circle"
              onClick={switchPlayersName}
              style={{
                marginLeft: '36%',
                backgroundColor: 'aquamarine',
                fontWeight: 'bolder',
                color: 'darkviolet'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{
                  height: '30px', 
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                  borderRadius: '0%'
                }}
                placeholder="Player 2"
                name="playerO"
                value={form.playerO}
                onChange={handleChange}
              />
              <Avatar
                style={{
                  backgroundColor: '#7265e6',
                  verticalAlign: 'middle',
                  marginLeft: '5px',
                  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
                }}
              >
                {'O'}
              </Avatar>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              style={{
                backgroundColor: 'limegreen',
                fontWeight: 'bolder',
                color: 'darkviolet'
              }}
            >
              {playerX && playerO ? 'Change players' : 'Add players'}
            </Button>          
            {/* <Row justify="space-around">
              <Col>
                <p>Single player</p>
              </Col>
              <Col>
                <Switch
                  size="small"
                  onChange={() => {}}
                  checked={treu}
                />
              </Col>
            </Row> */}
          </form>
        )
      }
    </>
  );
};