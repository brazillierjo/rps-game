'use client';

import { useMemo } from 'react';
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

const PLAYER_LABEL: Record<PlayerSlot, string> = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
};

export const MoveChoices = () => {
  const { currentPlayer, selections, selectMove, isRoundComplete } = useRoundSelection();

  const promptText = useMemo(() => {
    if (currentPlayer) return `${PLAYER_LABEL[currentPlayer]}: pick your move`;
    if (isRoundComplete) return 'Both players have chosen. Ready to resolve.';

    return 'Waiting to start';
  }, [currentPlayer, isRoundComplete]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.prompt}>{promptText}</p>

      <div className={styles.grid} role="group" aria-label="Select a move">
        {MOVES.map((move: Move) => {
          const Icon = MOVE_ICONS[move];
          const selectedBy: SelectedBy =
            selections.playerOne === move
              ? 'playerOne'
              : selections.playerTwo === move
                ? 'playerTwo'
                : null;

          return (
            <Button
              key={move}
              type="button"
              variant="ghost"
              className={cn(styles.moveButton, selectedBy && styles[selectedBy])}
              onClick={() => selectMove(move)}
              disabled={!currentPlayer}
              aria-pressed={Boolean(selectedBy)}
            >
              <Icon className={styles.icon} />

              <span>{MOVE_LABELS[move]}</span>

              {selectedBy && <span className={styles.tag}>{PLAYER_LABEL[selectedBy]}</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
