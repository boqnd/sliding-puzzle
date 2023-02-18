import { HttpService } from "./http.service.js";
import { tokenService } from "./token.service.js";


class AuthService extends HttpService {
    constructor() {
    super();
  }

  async login(data) {
    const token = await this.post('/auth/login', data);
    this.token = token;
  }

  async register(data) {
    return this.post('/auth/register', data);
  }

  async logout() {
    return this.post('/auth/logout');
  }

  get token() {
    return tokenService.getToken();
  }

  set token(token) {
    tokenService.setToken(token);
}

  get isAuthenticated() {
    return !!this.token;
  }
}

export const authService = new AuthService();
