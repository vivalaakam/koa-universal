import { parse } from '../helpers/telegram';
import UserSocial from '../models/user_social';
import User from '../models/user';
import Doing from '../models/doing';

const userSocialModel = new UserSocial();
const userModel = new User();

const controller = {
  async telegram(ctx, next) {
    const resp = parse(ctx.request.body);
    const { chat } = resp;
    const current = await userSocialModel.find('telegram', chat.username);
    let user;
    if (current) {
      user = current.user;
    }

    if (!user) {
      user = await userModel.create({
        social: [{
          uid: chat.id,
          login: chat.username,
          name: `${chat.first_name} ${chat.last_name}`,
          type: 'telegram'
        }]
      });
    }

    controller.handle(resp, user);
    ctx.status = 200;
    next();
  },
  async handle(data, user) {
    if (data.command) {
      const command = data.command.replace(/\w/, $1 => $1.toUpperCase());
      if (controller[`${data.type}${command}`]) {
        controller[`${data.type}${command}`](data, user);
      } else if (controller[data.type]) {
        controller[data.type](data, user);
      }
    }
  },
  async createDo(data, user) {
    const model = new Doing();
    await model.create({
      text: data.text,
      tags: data.tags,
      user_id: user.id,
      source_id: data.message_id
    });
  },
  async updateDo(data, user) {
    const model = new Doing();
    const entry = await model.find({ user_id: user.id, source_id: data.message_id });
    if (entry) {
      await model.update(entry.id, {
        text: data.text,
        tags: data.tags
      });
    }
  }
};

export default controller;
