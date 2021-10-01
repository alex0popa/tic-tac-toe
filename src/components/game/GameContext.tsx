import { createContext, useReducer, useMemo, useContext } from "react"

type Action = { str: string, mark: string };

type Players = { playerX: string, playerO: string };

type State = {
  history?: string[],
  historyPoint?: number,
  str?: string,
  mark?: string,
  playerX?: string,
  playerO?: string,
  isPlayersSet?: boolean,
  scoreX?: number,
  scoreO?: number
};

const initialGame = '         ';

const newGame = {
  str: initialGame,
  mark: 'X',
  history: [initialGame],
  historyPoint: 0
};

const initialState = {
  ...newGame,
  isPlayersSet: false,
  playerX: '',
  playerO: '',
  scoreX: 0,
  scoreO: 0,
};

const GameContext = createContext(
  {
    state: initialState,
    dispatch: (parameter: State) => {}
  }
);

const fixHistory = (arr: string[], i: number) => (
  i < arr.length - 1 ? arr.slice(0, i + 1) : arr
);

const gameReducer = (state: State, action: Action) => ({ ...state, ...action });

const isWinner = (s: string) => {
  const x = [
    // rows
    s.slice(0, 3), s.slice(3, 6), s.slice(6, 9),
    // columns
    s[0] + s[3] + s[6], s[1] + s[4] + s[7], s[2] + s[5] + s[8],
    // diag
    s[0] + s[4] + s[8], s[2] + s[4] + s[6],
  ];

  return x.includes('XXX') || x.includes('OOO')
};

const isDraw = (s: string) => !s.split('').includes(' ');

const setMark = (mark: string) => mark !== 'X' ? 'X' : 'O';

export const GameProvider = (props: any) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <GameContext.Provider value={value} {...props} />;
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used inside a GameProvider');
  }

  const { state, dispatch } = context;
  const {
    str,
    mark,
    history,
    historyPoint,
    isPlayersSet,
    playerO,
    playerX,
    scoreO,
    scoreX
  } = state;

  const addPlayers = (players: Players) => {
    dispatch({ ...initialState, ...players, isPlayersSet: true });
  };

  const changePlayers = () => {
    dispatch({ isPlayersSet: false });
  };

  const moveHistoryTo = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const i = +event.currentTarget.attributes.getNamedItem('value')!.value;
    const point = historyPoint + i;

    dispatch({ historyPoint: point, mark: setMark(mark), str: history[point] });
  };
  
  const resetGame = (params: any = {}) => {
    dispatch({ ...newGame, ...params })
  };

  const resetScore = () => {
    dispatch({ scoreO: 0, scoreX: 0 });
  };

  const switchPlayers = () => {
    dispatch({ playerO: playerX, playerX: playerO, scoreO: scoreX, scoreX: scoreO })
  };

  const handleDraw = () => {
    alert('The match ended in a draw');
    resetGame();
  };

  const handleWinner = () => {
    const player = state[`player${mark}` as keyof State];
    const scorePlayer = `score${mark}`;
    const newScore = +state[`score${mark}` as keyof State] + 1;

    alert(`${player} won!`);
    resetGame({ [scorePlayer]: newScore });
  };

  const setMove = (i: number) => {
    if (str[i] === ' ') {
      const newStr = str.slice(0, i) + mark + str.slice(i + 1);
      const newHistory = fixHistory(history, historyPoint).concat([newStr]);

      dispatch(
        {
          str: newStr,
          mark: setMark(mark),
          history: newHistory,
          historyPoint: newHistory.length - 1 
        }
      );
      isWinner(newStr) && handleWinner();
      isDraw(newStr) && !isWinner(newStr) && handleDraw();
    };
  };

  return {
    addPlayers,
    changePlayers,
    history,
    historyPoint,
    isPlayersSet,
    mark,
    moveHistoryTo,
    playerO,
    playerX,
    resetScore,
    resetGame,
    switchPlayers,
    scoreO,
    scoreX,
    setMove,
    str
  };
};