'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CubeIcon, CrumpledPaperIcon, ScissorsIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button/Button';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { MOVE_LABELS, MOVES, Move, PlayerSlot } from '@/lib/game/types';
import { cn } from '@/lib/utils/cn';
import styles from './MoveChoices.module.scss';

type SelectedBy = PlayerSlot | null;
type IconComponent = typeof CubeIcon;

const MOVE_ICONS: Record<Move, IconComponent> = {
  rock: CubeIcon,
  paper: CrumpledPaperIcon,
  scissors: ScissorsIcon,
};

const MotionButton = motion(Button);

export const MoveChoices = () => {
  const {
    currentPlayer,
    selections,
    selectMove,
    isRoundComplete,
    players,
    gameMode,
    autoPlayRound,
  } = useRoundSelection();

  const promptText = useMemo(() => {
    if (gameMode === 'COMPUTER_VS_COMPUTER') {
      if (isRoundComplete) return 'Bots are done! Start another round.';
      return 'Start a full bot showdown.';
    }

    if (currentPlayer) {
      const actor = players[currentPlayer];
      return actor.kind === 'human'
        ? `${actor.name}, pick your move`
        : `${actor.name} is thinking...`;
    }

    if (isRoundComplete) return 'Both players have locked their move.';
    return 'Start by choosing your move.';
  }, [currentPlayer, gameMode, isRoundComplete, players]);

  const canInteract =
    !!currentPlayer &&
    gameMode !== 'COMPUTER_VS_COMPUTER' &&
    players[currentPlayer].kind === 'human' &&
    Boolean(players[currentPlayer].name.trim()) &&
    !isRoundComplete;

  const hasMoves = Boolean(selections.playerOne || selections.playerTwo);
  const showAutoPlay = gameMode === 'COMPUTER_VS_COMPUTER';

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.prompt}>{promptText}</p>
        {showAutoPlay && (
          <Button type="button" variant="secondary" onClick={autoPlayRound} disabled={hasMoves}>
            Play round
          </Button>
        )}
      </div>

      <div className={styles.grid} role="group" aria-label="Select a move">
        {MOVES.map((move: Move) => {
          const Icon = MOVE_ICONS[move];

          const selectedBy: SelectedBy =
            selections.playerOne === move
              ? 'playerOne'
              : selections.playerTwo === move
                ? 'playerTwo'
                : null;

          const label = selectedBy ? players[selectedBy].displayName : null;

          return (
            <MotionButton
              key={move}
              type="button"
              variant="ghost"
              className={cn(styles.moveButton, selectedBy && styles[selectedBy])}
              onClick={() => selectMove(move)}
              disabled={!canInteract}
              aria-pressed={Boolean(selectedBy)}
              whileHover={canInteract ? { y: -4, scale: 1.01 } : undefined}
              whileTap={canInteract ? { scale: 0.985 } : undefined}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <Icon className={styles.icon} />

              <span>{MOVE_LABELS[move]}</span>

              {label && <span className={styles.tag}>{label}</span>}
            </MotionButton>
          );
        })}
      </div>
    </div>
  );
};
