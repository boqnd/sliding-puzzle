/**
 * @fileoverview HttpService class
 * @summary abstract class for http requests
 */
export class HttpService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/';
    this.token = null;
  }

  setAuthorizationHeader(token) {
    this.token = token;
  }

  getAuthorizationHeader() {
    return this.token;
  }

  async request(url, options) {
    const response = await fetch(this.baseUrl + url, options);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
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
