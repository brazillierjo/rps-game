'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button/Button';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { MOVE_LABELS } from '@/lib/game/types';
import styles from './RoundResult.module.scss';

export const RoundResult = () => {
  const { lastResult, resetRound, isRoundComplete, players } = useRoundSelection();

  if (!lastResult) {
    return (
      <div className={styles.placeholder}>
        {isRoundComplete ? 'Working out the winner...' : 'Pick your moves to see the result.'}
      </div>
    );
  }

  const { winner, winningMove, losingMove } = lastResult;
  const isDraw = winner === 'draw';

  let title: string;
  let description: string;

  if (isDraw) {
    title = 'Draw!';
    description = `You both picked ${MOVE_LABELS[lastResult.moves.playerOne]}.`;
  } else {
    const opposingSlot = winner === 'playerOne' ? 'playerTwo' : 'playerOne';
    title = `${players[winner].displayName} wins 🎉`;
    description = `${players[winner].displayName} beats ${players[opposingSlot].displayName}: ${MOVE_LABELS[winningMove!]} defeats ${MOVE_LABELS[losingMove!]}.`;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        className={styles.result}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>

        <Button type="button" onClick={resetRound}>
          Next round
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
