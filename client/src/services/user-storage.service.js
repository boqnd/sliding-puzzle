export class UserStorage {
    set token(token) {
      if (!token) {
        localStorage.removeItem('token');
        return;
      }
  
      localStorage.setItem('token', token);
    }
  
    get token() {
      return localStorage.getItem('token') ?? undefined;
    }
  }

export const userStorage = new UserStorage();
  