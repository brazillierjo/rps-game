import { MoveChoices } from '@/components/game/MoveChoices';
import { RoundResult } from '@/components/game/RoundResult';
import { PlayerStatus } from '@/components/game/PlayerStatus';
import { Scoreboard } from '@/components/game/Scoreboard';
import { GameModePicker } from '@/components/game/GameModePicker';
import { RoundSelectionProvider } from '@/contexts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <RoundSelectionProvider>
      <main className={styles.main}>
        <aside className={styles.controls}>
          <div className={styles.modePicker}>
            <span className={styles.sectionTitle}>Game mode</span>
            <GameModePicker />
          </div>

          <div className={styles.sectionHeading}>
            <span>Players</span>
          </div>

          <div className={styles.playerStatusList}>
            <PlayerStatus slot="playerOne" />
            <PlayerStatus slot="playerTwo" />
          </div>

          <div className={styles.scoreboardPanel}>
            <Scoreboard />
          </div>
        </aside>

        <section className={styles.board} aria-label="Game state">
          <MoveChoices />
          <RoundResult />
        </section>
      </main>
    </RoundSelectionProvider>
  );
}
