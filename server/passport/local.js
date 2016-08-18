import Auth from '../models/auth';
const auth = new Auth();
import bcrypt from 'bcrypt';
import {Strategy} from 'passport-local';

export default new Strategy(async(username, password, done) => {
        let users = await auth.list({username});
        if (users.length > 0) {
            let user = users[0];
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                    message: 'Incorrect password.',
                    state: "wrongpass"
                });
            } else {
                delete user.password;
                return done(null, user);
            }
        } else {
            let user = auth.create({
                username,
                password: bcrypt.hashSync(password, 8)
            });
            delete user.password;
            return done(null, user);
        }
    }
);