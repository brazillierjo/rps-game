export const MOVES = ['rock', 'paper', 'scissors'] as const;

export type Move = (typeof MOVES)[number];

export const MOVE_LABELS: Record<Move, string> = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

export type PlayerSlot = 'playerOne' | 'playerTwo';

export type RoundMoves = Record<PlayerSlot, Move>;
