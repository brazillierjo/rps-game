import { MoveChoices } from '@/components/game/MoveChoices';
import { Button } from '@/components/ui/button/Button';
import { RoundSelectionProvider } from '@/contexts/RoundSelectionContext';
import styles from './page.module.scss';

export default function Home() {
  return (
    <RoundSelectionProvider>
      <main className={styles.main}>
        <aside className={styles.controls}>
          <Button type="button">Player 1</Button>
          <Button type="button">Player 2</Button>
        </aside>

        <section className={styles.board} aria-label="Game state">
          <MoveChoices />
        </section>
      </main>
    </RoundSelectionProvider>
  );
}
