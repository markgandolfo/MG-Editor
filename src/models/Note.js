import _ from 'lodash';

const Dexie = require('dexie');

export default class Note {
  constructor({ id = null, date = Date.now(), description = '' }) {
    this.id = id;
    this.date = date;
    this.description = description;

    this.db = new Dexie('mgWriterNoteApp');
    this.db.version(1).stores({
      notes: '++id,title,date,description'
    });
    this.db.version(2).stores({
      notes: '++id,date,description'
    }).upgrade((trans) => {
      trans.notes.toCollection().modify((note) => {
        delete note.title; // eslint-disable-line no-param-reassign
      });
    });
  }

  static get(id) {
    const that = this;

    Dexie.spawn(function* () {
      yield that.db.notes.where('id').eq(id).toArray();
    });
  }

  static all(callback) {
    this.db = new Dexie('mgWriterNoteApp');
    this.db.version(2).stores({
      notes: '++id,date,description'
    });
    const that = this;

    Dexie.spawn(function* () {
      let notes = yield that.db.notes.toArray();

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
      that.id = yield that.db.notes.put(that.asJson());
    }).catch((err) => {
      console.error(`eek create went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  _update() {
    const that = this;

    Dexie.spawn(function* () {
      yield that.db.notes.update(that.id, that.asJson());
    }).catch((err) => {
      console.error(`eek update went wrong: ${err}`); // eslint-disable-line no-console
    });
  }

  asJson() {
    return {
      date: this.date,
      description: this.description
    };
  }
}
