import { HttpService } from "./http.service.js";


class ScoreService extends HttpService {
    constructor() {
        super();
    }

    async getScores() {
        return this.get("/scores");
    }

    async getScore(id) {
        return this.get(`/scores/${id}`);
    }

    async createScore(data) {
        return this.post("/scores", data);
    }

    async updateScore(id, data) {
        return this.put(`/scores/${id}`, data);
    }

    async deleteScore(id) {
        return this.delete(`/scores/${id}`);
    }
}

export const scoreService = new ScoreService();