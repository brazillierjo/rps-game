import { Button } from '@/components/ui/button/Button';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <aside className={styles.controls}>
        <Button type="button">Player 1</Button>
        <Button type="button">Player 2</Button>
      </aside>

      <section className={styles.board} aria-label="Game state" />
    </main>
  );
}
