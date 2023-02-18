class GameService {
    constructor() {
        this.games = {
            first: null,
            second: null,
        };
    }

    append(game) {
        if (!this.games.first) {
            this.games.first = game;
        } else if (!this.games.second) {
            this.games.second = game;
            console.log(this.games.first);
        }
    }

    getFirst() {
        return this.games.first;
    }

    clear() {
        this.games.first = null;
        this.games.second = null;
    }
}

export const gameService = new GameService();