import { BaseModel } from './base-model.js';
import { GameModel } from './game-model.js';

export class ScoreModel extends BaseModel {
  static get tableName() {
    return 'scores';
  }

  size;
  gameId;
  score;

  game;
  winner;

  static get relationMappings() {
    return {
      game: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: GameModel,
        join: {
          from: 'scores.gameId',
          to: 'games.id',
        },
      },
      winner: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: GameModel,
        join: {
          from: 'scores.winnerId',
          to: 'users.id',
        },
      }
    };
  }
}
