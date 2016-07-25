const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyC-VHnRCRn89-FVCx1Axnf1zgqwU2mEfFA",
    authDomain: "vivalaakam.firebaseapp.com",
    databaseURL: "https://vivalaakam.firebaseio.com",
    storageBucket: "firebase-vivalaakam.appspot.com",
};
const app = firebase.initializeApp(config);

class Base {
    constructor(collection) {
        this.collection = collection;
        this.db = app.database();

    }

    list() {
        return new Promise((resolve) => {
            this.db.ref(this.collection).once("value", (data) => {
                resolve(data.val());
            });
        })
    }

    getId(id) {
        return new Promise((resolve) => {
            this.db.ref(`${this.collection}/${id}`).once('value', (data) => {
                resolve(data.val());
            });
        });
    }

    create(data) {
        return new Promise((resolve) => {
            const ins = this.db.ref(`${this.collection}`).push(data, async () => {
                const resp = await this.getId(ins.key);
                resolve(resp);
            });
        });
    }

    update(id, data) {
        return new Promise((resolve) => {
            this.db.ref(`${this.collection}`).child(id).update(data, async () => {
                const resp = await this.getId(id);
                resolve(resp);
            });
        });
    }

    remove(id) {
        return new Promise(resolve => {
            this.db.ref(`${this.collection}/${id}`).remove(() => {
                resolve();
            });
        });
    }
}


module.exports = Base;