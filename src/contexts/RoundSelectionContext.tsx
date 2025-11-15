'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Move, PlayerSlot, RoundMoves } from '@/lib/game/types';

type RoundSelections = Partial<RoundMoves>;

export interface RoundSelectionContextValue {
  selections: RoundSelections;
  currentPlayer: PlayerSlot | null;
  isRoundComplete: boolean;
  selectMove: (move: Move) => void;
  resetRound: () => void;
}

const RoundSelectionContext = createContext<RoundSelectionContextValue | null>(null);

export const RoundSelectionProvider = ({ children }: PropsWithChildren) => {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSlot | null>('playerOne');
  const [selections, setSelections] = useState<RoundSelections>({});

  const selectMove = useCallback((move: Move) => {
    setCurrentPlayer((prevPlayer: PlayerSlot | null) => {
      if (!prevPlayer) return prevPlayer;

      setSelections((prevSelections: RoundSelections) => {
        if (prevSelections[prevPlayer] === move) return prevSelections;

        return {
          ...prevSelections,
          [prevPlayer]: move,
        };
      });

      return prevPlayer === 'playerOne' ? 'playerTwo' : null;
    });
  }, []);

  const resetRound = useCallback(() => {
    setSelections({});
    setCurrentPlayer('playerOne');
  }, []);

  const value = useMemo<RoundSelectionContextValue>(
    () => ({
      selections,
      currentPlayer,
      isRoundComplete: Boolean(selections.playerOne && selections.playerTwo),
      selectMove,
      resetRound,
    }),
    [currentPlayer, selections, selectMove, resetRound],
  );

  return <RoundSelectionContext.Provider value={value}>{children}</RoundSelectionContext.Provider>;
};

export const useRoundSelection = () => {
  const context = useContext(RoundSelectionContext);

  if (!context) throw new Error('useRoundSelection must be used within a RoundSelectionProvider');

  return context;
};
