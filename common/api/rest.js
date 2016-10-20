export default class Rest {
  constructor(url) {
    this.base_url = url;

    this.basic = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    };
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
    return fetch(url, {
      ...this.basic
    })
      .then((response) => {
        if (!response.ok) {
          return Rest.handleError(response);
        }
        return response.json();
      });
  }

  postQuery(url, data) {
    return fetch(url, {
      ...this.basic,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          return Rest.handleError(response);
        }
        return response.json();
      });
  }

  putQuery(url, data) {
    return fetch(url, {
      ...this.basic,
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          return Rest.handleError(response);
        }
        return response.json();
      });
  }

  deleteQuery(url) {
    return fetch(url, {
      method: 'DELETE',
      ...this.basic
    })
      .then((response) => {
        if (!response.ok) {
          return Rest.handleError(response);
        }
        return true;
      });
  }

  static async handleError(response) {
    const resp = await response.json();
    throw new Error(resp.message);
  }
}
