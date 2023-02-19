import { userStorage } from "./user-storage.service";
import jwt_decode from "jwt-decode";

// The whole point of this service is to avoid circular dependencies
class TokenService {
  constructor() {  }

  setToken(token) {
    userStorage.token = token;
  }

  getToken() {
    return userStorage.token;
  }

  getDecodedToken() {
    return jwt_decode(this.getToken());
  }
}

export const tokenService = new TokenService();