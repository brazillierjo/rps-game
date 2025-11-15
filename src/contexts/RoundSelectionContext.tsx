'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Move, PlayerSlot, RoundMoves, RoundResult, Scoreboard } from '@/lib/game/types';
import { applyRoundToScoreboard, createInitialScoreboard, resolveRound } from '@/lib/game/engine';

type RoundSelections = Partial<RoundMoves>;

export interface RoundSelectionContextValue {
  selections: RoundSelections;
  currentPlayer: PlayerSlot | null;
  isRoundComplete: boolean;
  selectMove: (move: Move) => void;
  resetRound: () => void;
  lastResult: RoundResult | null;
  scoreboard: Scoreboard;
}

const RoundSelectionContext = createContext<RoundSelectionContextValue | null>(null);

export const RoundSelectionProvider = ({ children }: PropsWithChildren) => {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSlot | null>('playerOne');
  const [selections, setSelections] = useState<RoundSelections>({});
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [scoreboard, setScoreboard] = useState<Scoreboard>(() => createInitialScoreboard());

  const finalizeRound = useCallback((moves: RoundMoves) => {
    const result = resolveRound(moves);

    setLastResult(result);
    setScoreboard((prev) => applyRoundToScoreboard(prev, result.winner));
  }, []);

  const selectMove = useCallback(
    (move: Move) => {
      if (!currentPlayer) {
        return;
      }

      if (selections[currentPlayer] === move) return;

      const nextSelections: RoundSelections = {
        ...selections,
        [currentPlayer]: move,
      };

      const roundReady = Boolean(nextSelections.playerOne && nextSelections.playerTwo);

      setSelections(nextSelections);

      if (roundReady) {
        finalizeRound(nextSelections as RoundMoves);
        setCurrentPlayer(null);
      } else setCurrentPlayer(currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne');
    },
    [currentPlayer, finalizeRound, selections],
  );

  const resetRound = useCallback(() => {
    setSelections({});
    setCurrentPlayer('playerOne');
    setLastResult(null);
  }, []);

  const value = useMemo<RoundSelectionContextValue>(
    () => ({
      selections,
      currentPlayer,
      isRoundComplete: Boolean(selections.playerOne && selections.playerTwo),
      selectMove,
      resetRound,
      lastResult,
      scoreboard,
    }),
    [currentPlayer, selections, selectMove, resetRound, lastResult, scoreboard],
  );

  return <RoundSelectionContext.Provider value={value}>{children}</RoundSelectionContext.Provider>;
};

export const useRoundSelection = () => {
  const context = useContext(RoundSelectionContext);

  if (!context) throw new Error('useRoundSelection must be used within a RoundSelectionProvider');

  return context;
};
