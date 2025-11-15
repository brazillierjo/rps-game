'use client';

import { CheckCircledIcon, StopwatchIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils/cn';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { MOVE_LABELS, PlayerSlot } from '@/lib/game/types';
import styles from './PlayerStatus.module.scss';

const PLAYER_LABEL: Record<PlayerSlot, string> = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
};

const StatusIcon = ({ state }: { state: 'active' | 'ready' | 'idle' }) => {
  if (state === 'active') {
    return <LightningBoltIcon aria-hidden className={styles.icon} />;
  }
  if (state === 'ready') {
    return <CheckCircledIcon aria-hidden className={styles.icon} />;
  }
  return <StopwatchIcon aria-hidden className={styles.icon} />;
};

export const PlayerStatus = ({ slot }: { slot: PlayerSlot }) => {
  const { currentPlayer, selections, isRoundComplete } = useRoundSelection();

  const move = selections[slot];
  const isActive = currentPlayer === slot;
  const hasLockedMove = Boolean(move);

  let status: string;
  if (isActive) {
    status = 'Your turn to choose';
  } else if (hasLockedMove) {
    status = isRoundComplete ? `Played ${MOVE_LABELS[move!]}` : 'Choice locked in';
  } else {
    status = 'Waiting for your turn';
  }

  const visualState: 'active' | 'ready' | 'idle' = isActive
    ? 'active'
    : hasLockedMove
      ? 'ready'
      : 'idle';

  return (
    <article className={cn(styles.card, styles[visualState])}>
      <div className={styles.content}>
        <p className={styles.name}>{PLAYER_LABEL[slot]}</p>
        <p className={styles.status}>{status}</p>
        {hasLockedMove && <p className={styles.move}>Selected: {MOVE_LABELS[move!]}</p>}
      </div>
      <StatusIcon state={visualState} />
    </article>
  );
};
