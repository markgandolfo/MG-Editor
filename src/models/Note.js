import _ from 'lodash';
import removeMarkdown from 'remove-markdown';
import Dexie from 'dexie';
import moment from 'moment';

const db = new Dexie('mgWriterNoteApp');

db.version(1).stores({
  notes: '++id,title,date,description'
});

db.version(2).stores({
  notes: '++id,date,description'
}).upgrade((trans) => {
  trans.notes.toCollection().modify((note) => {
    delete note.title; // eslint-disable-line no-param-reassign
  });
});

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
    let title = removeMarkdown(this.description);

    title = title.split('\n')[0]
            .substring(0, titleLength);

    if (title.charAt(titleLength + 1) !== ' ') {
      title = title.substring(0, Math.min(title.length, title.lastIndexOf(' ')));
    }

    return title;
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
    const that = this;

    Dexie.spawn(function* () {
      that.id = yield db.notes.put(that._asJson());
    }).catch((err) => {
      console.error(`eek create went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _update() {
    const that = this;

    Dexie.spawn(function* () {
      yield db.notes.update(that.id, that);
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
