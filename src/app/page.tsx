import { MoveChoices } from '@/components/game/MoveChoices';
import { RoundResult } from '@/components/game/RoundResult';
import { Scoreboard } from '@/components/game/Scoreboard';
import { Button } from '@/components/ui/button/Button';
import { RoundSelectionProvider } from '@/contexts/RoundSelectionContext';
import styles from './page.module.scss';

export default function Home() {
  return (
    <RoundSelectionProvider>
      <main className={styles.main}>
        <aside className={styles.controls}>
          <div className={styles.playerButtons}>
            <Button type="button">Player 1</Button>
            <Button type="button">Player 2</Button>
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
