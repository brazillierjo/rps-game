import {
  GAME_MODE_DEFINITIONS,
  GameMode,
  MOVES,
  Move,
  PlayerKind,
  PlayerNames,
  PlayerProfile,
  PlayerSlot,
  PlayersMap,
  RoundMoves,
  RoundOutcome,
  RoundResult,
  Scoreboard,
} from './types';

const WINS_AGAINST: Record<Move, Move> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

const HUMAN_DEFAULT_NAMES: Record<PlayerSlot, string> = {
  playerOne: 'Player 1',
  playerTwo: 'Player 2',
};

const COMPUTER_DEFAULT_NAMES: Record<PlayerSlot, string> = {
  playerOne: 'CPU 1',
  playerTwo: 'CPU 2',
};

const oppositeSlot = (slot: PlayerSlot): PlayerSlot =>
  slot === 'playerOne' ? 'playerTwo' : 'playerOne';

const getFallbackName = (slot: PlayerSlot, kind: PlayerKind) =>
  kind === 'computer' ? COMPUTER_DEFAULT_NAMES[slot] : HUMAN_DEFAULT_NAMES[slot];

const formatDisplayName = (value: string) => {
  const withSpaces = value.replace(/([a-z])(\d)/gi, '$1 $2').replace(/[_-]+/g, ' ');
  return withSpaces
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const createPlayerProfile = (
  slot: PlayerSlot,
  kind: PlayerKind,
  names: PlayerNames,
): PlayerProfile => {
  if (kind === 'computer') {
    const fallback = getFallbackName(slot, kind);
    return {
      slot,
      kind,
      name: '',
      displayName: fallback,
    };
  }

  const raw = names[slot] ?? '';
  const trimmed = raw.trim();
  const formatted = trimmed ? formatDisplayName(trimmed) : getFallbackName(slot, kind);
  return {
    slot,
    kind,
    name: raw,
    displayName: formatted,
  };
};

export const createPlayersForMode = (mode: GameMode, names: PlayerNames = {}): PlayersMap => {
  const definition = GAME_MODE_DEFINITIONS[mode];
  return {
    playerOne: createPlayerProfile('playerOne', definition.players.playerOne, names),
    playerTwo: createPlayerProfile('playerTwo', definition.players.playerTwo, names),
  };
};

export const getRandomMove = (): Move => {
  const index = Math.floor(Math.random() * MOVES.length);
  return MOVES[index];
};

export const evaluateMoves = (moves: RoundMoves): RoundOutcome => {
  const { playerOne, playerTwo } = moves;

  if (playerOne === playerTwo) return 'draw';

  return WINS_AGAINST[playerOne] === playerTwo ? 'playerOne' : 'playerTwo';
};

export const resolveRound = (moves: RoundMoves): RoundResult => {
  const winner = evaluateMoves(moves);

  if (winner === 'draw') {
    return {
      moves,
      winner,
      winningMove: null,
      losingMove: null,
    };
  }

  const loserSlot = oppositeSlot(winner);
  return {
    moves,
    winner,
    winningMove: moves[winner],
    losingMove: moves[loserSlot],
  };
};

export const createInitialScoreboard = (): Scoreboard => ({
  playerOne: 0,
  playerTwo: 0,
  draws: 0,
  rounds: 0,
});

export const applyRoundToScoreboard = (
  scoreboard: Scoreboard,
  outcome: RoundOutcome,
): Scoreboard => {
  const next: Scoreboard = {
    ...scoreboard,
    rounds: scoreboard.rounds + 1,
  };

  if (outcome === 'draw') {
    next.draws += 1;
    return next;
  }

  next[outcome] += 1;
  return next;
};
