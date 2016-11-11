import TelegramBot from 'node-telegram-bot-api';
import Response from './response';

const bot = new TelegramBot(process.env.ASSISTANT_TOKEN);

function parse(data) {
  const type = data.message ? 'create' : 'update';
  const raw = data.message || data.edited_message;
  return new Response(raw.text, raw.message_id, type, raw.entities, raw.chat);
}

function sendMessage(chat, text, options) {
  return bot.sendMessage(chat, text, options);
}

export { parse, sendMessage };
