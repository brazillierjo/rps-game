'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import styles from './Scoreboard.module.scss';

const AnimatedValue = ({ value }: { value: number }) => (
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.span
      key={value}
      className={styles.value}
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

export const Scoreboard = () => {
  const { scoreboard, players } = useRoundSelection();

  return (
    <motion.section
      className={styles.scoreboard}
      aria-label="Scoreboard"
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <header className={styles.header}>
        <h2>Scoreboard</h2>
        <p>{scoreboard.rounds} rounds played</p>
      </header>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>{players.playerOne.displayName}</span>
          <AnimatedValue value={scoreboard.playerOne} />
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Draws</span>
          <AnimatedValue value={scoreboard.draws} />
        </div>

        <div className={styles.row}>
          <span className={styles.label}>{players.playerTwo.displayName}</span>
          <AnimatedValue value={scoreboard.playerTwo} />
        </div>
      </div>
    </motion.section>
  );
};
