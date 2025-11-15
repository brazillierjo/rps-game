'use client';

import { motion } from 'framer-motion';
import { CheckCircledIcon, LightningBoltIcon, StopwatchIcon } from '@radix-ui/react-icons';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { MOVE_LABELS, PlayerSlot } from '@/lib/game/types';
import { cn } from '@/lib/utils/cn';
import styles from './PlayerStatus.module.scss';

type VisualState = 'active' | 'ready' | 'idle';

const StatusIcon = ({ state }: { state: VisualState }) => {
  if (state === 'active') return <LightningBoltIcon aria-hidden className={styles.icon} />;
  if (state === 'ready') return <CheckCircledIcon aria-hidden className={styles.icon} />;
  return <StopwatchIcon aria-hidden className={styles.icon} />;
};

export const PlayerStatus = ({ slot }: { slot: PlayerSlot }) => {
  const { currentPlayer, selections, isRoundComplete, players, updatePlayerName, gameMode } =
    useRoundSelection();

  const player = players[slot];
  const move = selections[slot];
  const isActive = currentPlayer === slot;
  const hasLockedMove = Boolean(move);
  const needsName = player.kind === 'human' && !player.name.trim();

  let status: string;

  if (needsName) status = 'Enter a name to start';
  else if (gameMode === 'COMPUTER_VS_COMPUTER')
    status = player.kind === 'computer' ? 'Bot ready' : 'Waiting';
  else if (isActive) status = player.kind === 'human' ? 'Your turn' : 'Bot is thinking';
  else if (hasLockedMove) status = isRoundComplete ? `Played ${MOVE_LABELS[move!]}` : 'Move locked';
  else status = 'Waiting';

  const visualState: VisualState = isActive ? 'active' : hasLockedMove ? 'ready' : 'idle';

  return (
    <motion.article
      className={cn(styles.card, styles[visualState])}
      layout
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <div className={styles.identity}>
        {player.kind === 'human' ? (
          <input
            aria-label={`${player.displayName} name`}
            className={styles.nameInput}
            placeholder="Enter name"
            value={player.name}
            onChange={(event) => updatePlayerName(slot, event.target.value)}
          />
        ) : (
          <p className={styles.name}>{player.displayName}</p>
        )}
      </div>

      <div className={styles.typeRow}>
        <span className={cn(styles.badge, styles[player.kind])}>
          {player.kind === 'human' ? 'Human' : 'Bot'}
        </span>
        <StatusIcon state={visualState} />
      </div>

      <p className={styles.status}>{status}</p>

      {move && (
        <p className={styles.move}>
          Move: <strong>{MOVE_LABELS[move]}</strong>
        </p>
      )}
    </motion.article>
  );
};
