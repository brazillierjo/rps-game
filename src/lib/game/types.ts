export const MOVES = ['rock', 'paper', 'scissors'] as const;

export type Move = (typeof MOVES)[number];

export const MOVE_LABELS: Record<Move, string> = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

export const PLAYER_SLOTS = ['playerOne', 'playerTwo'] as const;

export type PlayerSlot = (typeof PLAYER_SLOTS)[number];

export type PlayerKind = 'human' | 'computer';

export interface PlayerProfile {
  slot: PlayerSlot;
  name: string;
  displayName: string;
  kind: PlayerKind;
}

export type PlayersMap = Record<PlayerSlot, PlayerProfile>;

export type PlayerNames = Partial<Record<PlayerSlot, string>>;

export const GAME_MODES = [
  'PLAYER_VS_PLAYER',
  'PLAYER_VS_COMPUTER',
  'COMPUTER_VS_COMPUTER',
] as const;

export type GameMode = (typeof GAME_MODES)[number];

export interface GameModeDefinition {
  label: string;
  description: string;
  players: Record<PlayerSlot, PlayerKind>;
}

export const GAME_MODE_DEFINITIONS: Record<GameMode, GameModeDefinition> = {
  PLAYER_VS_PLAYER: {
    label: 'Player vs Player',
    description: 'Two humans take turns locally',
    players: {
      playerOne: 'human',
      playerTwo: 'human',
    },
  },
  PLAYER_VS_COMPUTER: {
    label: 'Player vs Computer',
    description: 'Challenge a computer opponent',
    players: {
      playerOne: 'human',
      playerTwo: 'computer',
    },
  },
  COMPUTER_VS_COMPUTER: {
    label: 'Computer vs Computer',
    description: 'Watch two bots face off',
    players: {
      playerOne: 'computer',
      playerTwo: 'computer',
    },
  },
};

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
