import {Strategy} from 'passport-github';
import {callback, url} from './social_hadler';

const TYPE = 'github';

export default new Strategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: url(TYPE, process.env.PORT)
    },
    callback(function (profile) {
        return {
            [`${TYPE}_login`]: profile.username,
            [`${TYPE}_name`]: profile.displayName || null,
            [`${TYPE}_url`]: profile.profileUrl,
            [`${TYPE}_avatarUrl`]: profile._json.avatar_url
        };
    }, TYPE)
);