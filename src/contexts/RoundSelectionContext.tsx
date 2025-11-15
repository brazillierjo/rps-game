'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GameMode,
  Move,
  PlayerNames,
  PlayerSlot,
  PlayersMap,
  RoundMoves,
  RoundResult,
  Scoreboard,
  PLAYER_SLOTS,
} from '@/lib/game/types';
import {
  applyRoundToScoreboard,
  createInitialScoreboard,
  createPlayersForMode,
  getRandomMove,
  resolveRound,
} from '@/lib/game/engine';

type RoundSelections = Partial<RoundMoves>;

const deriveInitialPlayer = (mode: GameMode, names: PlayerNames): PlayerSlot | null => {
  if (mode === 'COMPUTER_VS_COMPUTER') {
    return null;
  }
  const derivedPlayers = createPlayersForMode(mode, names);
  if (derivedPlayers.playerOne.kind === 'human') return 'playerOne';
  if (derivedPlayers.playerTwo.kind === 'human') return 'playerTwo';
  return null;
};

export interface RoundSelectionContextValue {
  selections: RoundSelections;
  currentPlayer: PlayerSlot | null;
  isRoundComplete: boolean;
  selectMove: (move: Move) => void;
  resetRound: () => void;
  lastResult: RoundResult | null;
  scoreboard: Scoreboard;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  players: PlayersMap;
  updatePlayerName: (slot: PlayerSlot, name: string) => void;
  autoPlayRound: () => void;
}

const RoundSelectionContext = createContext<RoundSelectionContextValue | null>(null);

export const RoundSelectionProvider = ({ children }: PropsWithChildren) => {
  const [gameMode, setGameModeState] = useState<GameMode>('PLAYER_VS_PLAYER');
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    playerOne: 'Player 1',
    playerTwo: 'Player 2',
  });
  const [selections, setSelections] = useState<RoundSelections>({});
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSlot | null>(() =>
    deriveInitialPlayer(gameMode, playerNames),
  );
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [scoreboard, setScoreboard] = useState<Scoreboard>(() => createInitialScoreboard());

  const playerNamesRef = useRef<PlayerNames>({
    playerOne: 'Player 1',
    playerTwo: 'Player 2',
  });

  useEffect(() => {
    playerNamesRef.current = playerNames;
  }, [playerNames]);

  const players = useMemo(
    () => createPlayersForMode(gameMode, playerNames),
    [gameMode, playerNames],
  );

  const selectionsRef = useRef<RoundSelections>({});

  useEffect(() => {
    selectionsRef.current = selections;
  }, [selections]);

  const hardResetRound = useCallback(() => {
    setSelections({});
    selectionsRef.current = {};
    setLastResult(null);
    setCurrentPlayer(deriveInitialPlayer(gameMode, playerNamesRef.current));
  }, [gameMode]);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameModeState(mode);
    setScoreboard(createInitialScoreboard());
    selectionsRef.current = {};
    setSelections({});
    setLastResult(null);
    setCurrentPlayer(deriveInitialPlayer(mode, playerNamesRef.current));
  }, []);

  const commitSelection = useCallback(
    (slot: PlayerSlot, move: Move, base?: RoundSelections) => {
      const reference = base ?? selectionsRef.current;
      if (reference[slot] === move) return reference;

      const nextSelections: RoundSelections = {
        ...reference,
        [slot]: move,
      };

      selectionsRef.current = nextSelections;
      setSelections(nextSelections);

      const ready = Boolean(nextSelections.playerOne && nextSelections.playerTwo);

      if (ready) {
        const round = nextSelections as RoundMoves;
        const result = resolveRound(round);
        setLastResult(result);
        setScoreboard((prev) => applyRoundToScoreboard(prev, result.winner));
        setCurrentPlayer(null);
      } else if (gameMode !== 'COMPUTER_VS_COMPUTER') {
        const nextActor = PLAYER_SLOTS.find((candidate) => !nextSelections[candidate]) ?? null;
        setCurrentPlayer(nextActor ?? null);
      }

      return nextSelections;
    },
    [gameMode],
  );

  const selectMove = useCallback(
    (move: Move) => {
      if (!currentPlayer) return;

      const actor = players[currentPlayer];

      if (actor.kind !== 'human') return;
      if (!actor.name.trim()) return;

      commitSelection(currentPlayer, move);
    },
    [commitSelection, currentPlayer, players],
  );

  const updatePlayerName = useCallback((slot: PlayerSlot, name: string) => {
    setPlayerNames((prev) => ({
      ...prev,
      [slot]: name,
    }));
  }, []);

  const resetRound = useCallback(() => {
    hardResetRound();
  }, [hardResetRound]);

  const autoPlayRound = useCallback(() => {
    if (gameMode !== 'COMPUTER_VS_COMPUTER') return;
    if (selectionsRef.current.playerOne && selectionsRef.current.playerTwo) return;

    let workingSelections = selectionsRef.current;
    PLAYER_SLOTS.forEach((slot) => {
      workingSelections = commitSelection(slot, getRandomMove(), workingSelections);
    });
  }, [commitSelection, gameMode]);

  useEffect(() => {
    if (!currentPlayer) return;
    if (gameMode === 'COMPUTER_VS_COMPUTER') return;

    const actor = players[currentPlayer];

    if (actor.kind !== 'computer') return;

    const timeout = setTimeout(() => {
      commitSelection(currentPlayer, getRandomMove());
    }, 650);

    return () => clearTimeout(timeout);
  }, [commitSelection, currentPlayer, gameMode, players]);

  const isRoundComplete = Boolean(selections.playerOne && selections.playerTwo);

  const value = useMemo<RoundSelectionContextValue>(
    () => ({
      selections,
      currentPlayer,
      isRoundComplete,
      selectMove,
      resetRound,
      lastResult,
      scoreboard,
      gameMode,
      setGameMode: changeGameMode,
      players,
      updatePlayerName,
      autoPlayRound,
    }),
    [
      autoPlayRound,
      currentPlayer,
      gameMode,
      isRoundComplete,
      lastResult,
      players,
      resetRound,
      scoreboard,
      selectMove,
      selections,
      updatePlayerName,
      changeGameMode,
    ],
  );

  return <RoundSelectionContext.Provider value={value}>{children}</RoundSelectionContext.Provider>;
};

export const useRoundSelection = () => {
  const context = useContext(RoundSelectionContext);

  if (!context) throw new Error('useRoundSelection must be used within a RoundSelectionProvider');

  return context;
};
