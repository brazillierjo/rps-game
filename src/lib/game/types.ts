export const MOVES = ['rock', 'paper', 'scissors'] as const;

export type Move = (typeof MOVES)[number];

export const MOVE_LABELS: Record<Move, string> = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

export type PlayerSlot = 'playerOne' | 'playerTwo';

export type RoundMoves = Record<PlayerSlot, Move>;

export type RoundOutcome = PlayerSlot | 'draw';

export interface RoundResult {
  moves: RoundMoves;
  winner: RoundOutcome;
  winningMove: Move | null;
  losingMove: Move | null;
}

export interface Scoreboard {
  playerOne: number;
  playerTwo: number;
  draws: number;
  rounds: number;
}
