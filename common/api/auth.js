import Rest from './rest';

export default class Auth extends Rest {
    constructor() {
        super('/api/auth');
    }

    current() {
        return this.getQuery(`${this.base_url}/`);
    }
}