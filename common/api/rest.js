/* eslint class-methods-use-this: "off" */

export default class Rest {
  constructor(url) {
    this.base_url = url;
  }

  create(data) {
    return this.postQuery(`${this.base_url}`, data);
  }

  update(id, data) {
    return this.putQuery(`${this.base_url}/${id}`, data);
  }

  fetch(id) {
    return this.getQuery(`${this.base_url}/${id}`);
  }

  all() {
    return this.getQuery(`${this.base_url}`);
  }

  remove(id) {
    return this.deleteQuery(`${this.base_url}/${id}`);
  }

  getQuery(url) {
    return fetch(url, Rest.options())
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  postQuery(url, data) {
    return fetch(url, Rest.options({
      method: 'POST',
      body: JSON.stringify(data)
    }))
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  putQuery(url, data) {
    return fetch(url, Rest.options({
      method: 'PUT',
      body: JSON.stringify(data)
    }))
      .then(Rest.afterQuery)
      .then(response => response.json());
  }

  deleteQuery(url) {
    return fetch(url, Rest.options({
      method: 'DELETE'
    }))
      .then(Rest.afterQuery)
      .then(() => true);
  }

  static async handleError(response) {
    const resp = await response.json();
    throw new Error(resp.message);
  }

  static afterQuery(response) {
    if (!response.ok) {
      return Rest.handleError(response);
    }

    const jwt = response.headers.get('Authorization');
    if (jwt) {
      const [, token] = jwt.split(' ');
      localStorage.setItem('jwtToken', token);
    }

    return response;
  }

  static options(params = {}) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (localStorage.getItem('jwtToken')) {
      headers.Authorization = `JWT ${localStorage.getItem('jwtToken')}`;
    }

    return {
      headers,
      mode: 'cors',
      credentials: 'include',
      ...params
    };
  }
}
