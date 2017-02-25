import _ from 'lodash';
import removeMarkdown from 'remove-markdown';
import moment from 'moment';
import Dexie from 'dexie';
import db from 'repositories/DexieBase';

export default class Note {
  constructor({ id = null, date = Date.now(), description = '' }) {
    this.id = id;
    this.date = date;
    this.description = description;
  }

  static defaultNote() {
    return '# Welcome to MG-Writer\n\nMG-Writer is a simple, plain text editor. You can write using markdown and the notes will be saved locally in your browser.\n\nCreate new notes, edit and delete all from your browser.';
  }

  static get(id) {
    Dexie.spawn(function* () {
      yield db.notes.where('id').eq(id).toArray();
    });
  }

  static all(callback) {
    Dexie.spawn(function* () {
      let notes = yield db.notes.toArray();

      notes = _.map(notes, (note) => { // eslint-disable-line arrow-body-style
        return new Note(
          {
            id: note.id,
            description: note.description,
            date: note.date
          });
      });

      notes = _.orderBy(notes, 'id', ['desc']);

      return callback(notes);
    });
  }

  static delete(noteId, successCallback, errorCallback) {
    Dexie.spawn(function* () {
      yield db.notes.delete(noteId);
      return successCallback();
    }).catch((err) => {
      console.error(`eek, delete went wrong: ${err}`); // eslint-disable-line no-console
    });
    if (errorCallback !== undefined) {
      return errorCallback();
    }
    return null;
  }

  // Presentation
  title() {
    const titleLength = 116;
    let truncatedTitle = removeMarkdown(this.description).split('\n')[0];
    const titleChar117 = truncatedTitle.charAt(titleLength + 1);

    if (titleChar117 !== -1 && titleChar117 !== ' ') {
      const spaceIndex = truncatedTitle.indexOf(' ', titleLength);

      if (spaceIndex !== -1) {
        truncatedTitle = truncatedTitle.substring(0, spaceIndex);
      }
    }

    return truncatedTitle;
  }

  prettyDate() {
    return moment(this.date).format('ddd Do MMM, h:mA');
  }

  // DB Methods
  save() {
    if (this.id === null) {
      this._create();
    } else {
      this._update();
    }

    return this;
  }

  _create() {
    const _this = this;

    Dexie.spawn(function* () {
      _this.id = yield db.notes.put(_this._asJson());
    }).catch((err) => {
      console.error(`eek create went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _update() {
    const _this = this;

    Dexie.spawn(function* () {
      yield db.notes.update(_this.id, _this._asJson());
    }).catch((err) => {
      console.error(`eek update went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _asJson() {
    return {
      description: this.description,
      date: this.date
    };
  }
}
