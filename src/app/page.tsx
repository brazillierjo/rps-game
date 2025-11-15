import { MoveChoices } from '@/components/game/MoveChoices';
import { RoundResult } from '@/components/game/RoundResult';
import { PlayerStatus } from '@/components/game/PlayerStatus';
import { Scoreboard } from '@/components/game/Scoreboard';
import { RoundSelectionProvider } from '@/contexts/RoundSelectionContext';
import styles from './page.module.scss';

export default function Home() {
  return (
    <RoundSelectionProvider>
      <main className={styles.main}>
        <aside className={styles.controls}>
          <div className={styles.playerStatusList}>
            <PlayerStatus slot="playerOne" />
            <PlayerStatus slot="playerTwo" />
          </div>
          <Scoreboard />
        </aside>

        <section className={styles.board} aria-label="Game state">
          <MoveChoices />
          <RoundResult />
        </section>
      </main>
    </RoundSelectionProvider>
  );
}
