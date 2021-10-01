import './App.css';

import { Game } from './components/game/Game';
import { GameProvider } from './components/game/GameContext';
import { PlayersForm } from './components/game/PlayersForm';

export const App = () => (
  <div >
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <p>Tic Tac Toe</p>
      <div style={{ display: 'grid', placeItems: 'center', marginTop: '250px' }}>
        <GameProvider>
          <Game />
          <PlayersForm />
        </GameProvider>
      </div>
    </div>
  </div>
);
