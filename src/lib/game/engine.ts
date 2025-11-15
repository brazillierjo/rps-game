import { Move, PlayerSlot, RoundMoves, RoundOutcome, RoundResult, Scoreboard } from './types';

const WINS_AGAINST: Record<Move, Move> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

const oppositeSlot = (slot: PlayerSlot): PlayerSlot =>
  slot === 'playerOne' ? 'playerTwo' : 'playerOne';

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
