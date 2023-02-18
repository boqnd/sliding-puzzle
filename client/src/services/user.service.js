class UserService extends HttpService {
    constructor() {
        super();
    }

    async getUsers() {
        return this.get("/users");
    }

    async getUser(id) {
        return this.get(`/users/${id}`);
    }

    async createUser(data) {
        return this.post("/users", data);
    }

    async updateUser(id, data) {
        return this.put(`/users/${id}`, data);
    }

    async deleteUser(id) {
        return this.delete(`/users/${id}`);
    }
}