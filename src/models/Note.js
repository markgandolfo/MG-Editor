const Dexie = require('dexie');

export default class Note {
  constructor({ id = null, date = Date.now(), title = '', description = '' }) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;

    this.db = new Dexie('mgWriterNoteApp');
    this.db.version(1).stores({
      notes: '++id,date,title,description'
    });
  }

  static get(id) {
    const that = this;

    Dexie.spawn(function* () {
      yield that.db.notes.where('id').eq(id).toArray();
    });
  }

  static all() {
    const that = this;

    Dexie.spawn(function* () {
      yield that.db.notes.toArray();
    });
  }

  save() {
    console.log(this.id);
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
      console.err(`eek create went wrong: ${err}`);
    });
  }

  _update() {
    const that = this;

    Dexie.spawn(function* () {
      yield that.db.notes.update(that.id, that.asJson());
    }).catch((err) => {
      console.err(`eek update went wrong: ${err}`);
    });
  }

  asJson() {
    console.log('asJson');
    return {
      date: this.date,
      title: this.title,
      description: this.description
    };
  }
}

