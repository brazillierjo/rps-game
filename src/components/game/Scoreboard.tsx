'use client';

import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import styles from './Scoreboard.module.scss';

const PLAYER_LABEL = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
} as const;

export const Scoreboard = () => {
  const { scoreboard } = useRoundSelection();

  return (
    <section className={styles.scoreboard} aria-label="Scoreboard">
      <header className={styles.header}>
        <h2>Scoreboard</h2>
        <p>Rounds played: {scoreboard.rounds}</p>
      </header>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>{PLAYER_LABEL.playerOne}</span>
          <span className={styles.value}>{scoreboard.playerOne}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Draws</span>
          <span className={styles.value}>{scoreboard.draws}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>{PLAYER_LABEL.playerTwo}</span>
          <span className={styles.value}>{scoreboard.playerTwo}</span>
        </div>
      </div>
    </section>
  );
};
