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
  login: profile.username,
  name: profile.displayName || null,
  url: profile.profileUrl,
  avatarUrl: profile._json.avatar_url,
  uid: profile._json.id,
  email: profile._json.email,
  type: 'github'
});

export default new Strategy(CLIENT, callback(CALLBACK, TYPE));
