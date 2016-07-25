const Base = require('./Base');

class Todo extends Base {
    constructor() {
        super('todos');
    }
}

module.exports = Todo;