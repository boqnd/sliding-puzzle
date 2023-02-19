import { BaseModel } from './base-model.js';
import { UserModel } from './user-model.js';

export class GameModel extends BaseModel {
  static get tableName() {
    return 'games';
  }

  name;
  player1Id;
  player2Id;
  duration;

  player1;
  player2;

  static get relationMappings() {
    return {
      player1: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'games.player1Id',
          to: 'users.id',
        },
      },
      player2: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'games.player2Id',
          to: 'users.id',
        },
      },
    };
  }
}
