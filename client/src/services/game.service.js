
// service to make http requests to the server
import { HttpService } from "./http.service.js";

class GameService extends HttpService {
    constructor() {
        super();
    }

    async getGames() {
        return this.get("/games");
    }

    async getGame(id) {
        return this.get(`/games/${id}`);
    }

    async createGame(data) {
        return this.post("/games", data);
    }

    async updateGame(id, data) {
        return this.put(`/games/${id}`, data);
    }

    async deleteGame(id) {
        return this.delete(`/games/${id}`);
    }
}

export const gameService = new GameService();