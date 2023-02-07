import { GameModel } from '../models/game-model.js';

class GameService {
  async create(game) {
    return await GameModel.query().insertAndFetch({
      name: game.name,
      player1Id: game.player1Id,
      player2Id: game.player2Id,
      duration: game.duration,
    });
  }

  async getAll() {
    return await GameModel.query();
  }

  async findByPk(id) {
    return await GameModel.query().findById(id).throwIfNotFound();
  }

  async update(id, game) {
    return await GameModel.query()
      .patchAndFetchById(id, {
        name: game.name,
        player1Id: game.player1Id,
        player2Id: game.player2Id,
        duration: game.duration,
      })
      .throwIfNotFound();
  }

  async delete(id) {
    return await GameModel.query().deleteById(id);
  }

  async getGamesByUserId(id) {
    return await GameModel.query()
      .where('player1Id', id)
      .orWhere('player2Id', id)
      .throwIfNotFound();
  }

  async getGameWithPlayers(id) {
    return await GameModel.query()
      .findById(id)
      .withGraphFetched('player1')
      .withGraphFetched('player2')
      .throwIfNotFound();
  }
}

export const gameService = new GameService();
