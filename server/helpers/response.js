export default class Response {
  static preprare(raw = '', entities = []) {
    const removeLast = (text, substr) => {
      const tmp = text.split(substr);
      const last = tmp.pop();
      return tmp.join(substr) + last;
    };

    return entities.reduceRight((state, tag) => {
      switch (tag.type) {
        case 'hashtag':
          const htag = state.text.slice(tag.offset, tag.offset + tag.length);
          state.tags.push({ text: htag.slice(1) });
          state.text = removeLast(state.text, htag).trim();
          return state;
        case 'bot_command':
          state.command = state.text.slice(0, tag.length).substr(1);
          state.text = state.text.slice(tag.length).trim();
          return state;
        default:
          return state;
      }
    }, { text: raw, command: '', tags: [] });
  }

  constructor(rawText, messageId, type = 'create', entities = [], chat = {}) {
    const { text, tags, command } = Response.preprare(rawText, entities);
    this.type = type;
    this.text = text;
    this.tags = tags;
    this.command = command;
    this.raw = rawText;
    this.entities = entities;
    this.message_id = messageId.toString();
    this.chat = chat;
  }
}
