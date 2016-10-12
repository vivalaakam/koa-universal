/* eslint no-underscore-dangle: ["error", { "allow": ["_json"] }] */

import { Strategy } from 'passport-github';
import { callback, url } from './social_hadler';

const TYPE = 'github';
const CLIENT = {
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: url(TYPE, process.env.PORT)
};
const CALLBACK = profile => ({
  [`${TYPE}_login`]: profile.username,
  [`${TYPE}_name`]: profile.displayName || null,
  [`${TYPE}_url`]: profile.profileUrl,
  [`${TYPE}_avatarUrl`]: profile._json.avatar_url
});

export default new Strategy(CLIENT, callback(CALLBACK, TYPE));
