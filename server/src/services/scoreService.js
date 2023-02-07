import { ScoreModel } from '../models/score-model.js';

class ScoreService {
  async create(score) {
    return await ScoreModel.query().insertAndFetch({
      size: score.size,
      gameId: score.gameId,
      scoreP1: score.scoreP1,
      scoreP2: score.scoreP2,
    });
  }

  async getAll() {
    return await ScoreModel.query();
  }

  async findByPk(id) {
    return await ScoreModel.query().findById(id).throwIfNotFound();
  }

  async update(id, score) {
    return await ScoreModel.query()
      .patchAndFetchById(id, {
        size: score.size,
        gameId: score.gameId,
        scoreP1: score.scoreP1,
        scoreP2: score.scoreP2,
      })
      .throwIfNotFound();
  }

  async delete(id) {
    return await ScoreModel.query().deleteById(id).throwIfNotFound();
  }

  async getScoresByGameId(id) {
    return await ScoreModel.query().where('gameId', id).throwIfNotFound();
  }

  async getScoresByWinnerId(id) {
    return await ScoreModel.query().where('winnerId', id).throwIfNotFound();
  }

  async getScoresWithGameAndWinner(id) {
    return await ScoreModel.query()
      .findById(id)
      .withGraphFetched('game')
      .withGraphFetched('winner')
      .throwIfNotFound();
  }
}

export const scoreService = new ScoreService();
