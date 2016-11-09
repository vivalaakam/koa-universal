import React, { Component, PropTypes } from 'react';
import { Btn } from '../UI';
import style from './DoingCreate.scss';

export default class DoingCreate extends Component {
  static propTypes = {
    createDoing: PropTypes.func.isRequired
  };

  static onPaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  createDoing() {
    const text = this.refEditor.innerHTML;
    let tags = [];
    const regex = /#\w+/g;
    let m = regex.exec(text);

    while (m !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex += 1;
      }
      tags = tags.concat(m.map(match => ({
        text: match.substr(1),
        offset: text.indexOf(match),
        length: match.length
      })));

      m = regex.exec(text);
    }
    this.props.createDoing({ text, tags });
    this.refEditor.innerHTML = '';
  }

  render() {
    return (
      <div className={style.DoingCreate}>
        <div className={style.wrapper}>
          <div className={style.editor} contentEditable ref={c => (this.refEditor = c)} onPaste={DoingCreate.onPaste} />
          <div className={style.back}>Enter here...</div>
        </div>
        <div className={style.navigation}>
          <Btn onClick={::this.createDoing}>Create</Btn>
        </div>
      </div>
    );
  }
}
