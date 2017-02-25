import Dexie from 'dexie';

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

db.version(3).stores({
  notes: '++id,date,description',
  config: '++id,type,configuration'
});

module.exports = db;
