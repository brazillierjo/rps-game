'use client';

import { Button } from '@/components/ui/button/Button';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { MOVE_LABELS, PlayerSlot } from '@/lib/game/types';
import styles from './RoundResult.module.scss';

const PLAYER_LABEL: Record<PlayerSlot, string> = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
};

export const RoundResult = () => {
  const { lastResult, resetRound, isRoundComplete } = useRoundSelection();

  if (!lastResult) {
    return (
      <div className={styles.placeholder}>
        {isRoundComplete
          ? 'Calculating results...'
          : 'Waiting for both players to choose their moves.'}
      </div>
    );
  }

  const { winner, winningMove, losingMove } = lastResult;
  const isDraw = winner === 'draw';

  const summary = isDraw
    ? `It's a draw! Both chose ${MOVE_LABELS[lastResult.moves.playerOne]}`
    : `${PLAYER_LABEL[winner]} wins: ${MOVE_LABELS[winningMove!]} beats ${MOVE_LABELS[losingMove!]}`;

  return (
    <div className={styles.result}>
      <div>
        <p className={styles.title}>{isDraw ? 'Draw' : `${PLAYER_LABEL[winner]} wins!`}</p>
        <p className={styles.description}>{summary}</p>
      </div>

      <Button type="button" onClick={resetRound}>
        Next Round
      </Button>
    </div>
  );
};
