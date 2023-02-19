import { tokenService } from "./token.service";

/**
 * @fileoverview HttpService class
 * @summary abstract class for http requests
 */
export class HttpService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/';
  }

  getAuthorizationHeader() {
    return tokenService.getToken();
  }

  async request(url, options) {
    try {
        const response = await fetch(this.baseUrl + url, options);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
  }

  async get(url) {
    return this.request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.getAuthorizationHeader(),
      },
    });
  }

  async post(url, data) {
    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    });
  }

  async put(url, data) {
    return this.request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.getAuthorizationHeader(),
      },
      body: JSON.stringify(data),
    });
  }

  async delete(url) {
    return this.request(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.getAuthorizationHeader(),
      },
    });
  }
}
