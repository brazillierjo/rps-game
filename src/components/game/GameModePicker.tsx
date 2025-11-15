'use client';

import { motion } from 'framer-motion';
import { useRoundSelection } from '@/contexts/RoundSelectionContext';
import { GAME_MODE_DEFINITIONS, GameMode } from '@/lib/game/types';
import styles from './GameModePicker.module.scss';

const MotionButton = motion.button;

export const GameModePicker = () => {
  const { gameMode, setGameMode, resetRound } = useRoundSelection();

  const handleSelect = (mode: GameMode) => {
    if (mode === gameMode) {
      resetRound();
      return;
    }

    setGameMode(mode);
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(GAME_MODE_DEFINITIONS).map(([key, definition]) => {
        const mode = key as GameMode;
        const isActive = gameMode === mode;

        return (
          <MotionButton
            key={mode}
            type="button"
            className={isActive ? styles.active : styles.mode}
            onClick={() => handleSelect(mode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.label}>{definition.label}</span>
            <p>{definition.description}</p>
          </MotionButton>
        );
      })}
    </div>
  );
};
