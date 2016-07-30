import Rest from './rest';

export default class Todos extends Rest {
    constructor() {
        super('/api/todos');
    }
}