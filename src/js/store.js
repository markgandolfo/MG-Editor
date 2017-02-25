import Note from 'models/Note.js';

export default {
  debug: process.env.NODE_ENV !== 'production' || false,

  state: {
    currentNote: new Note({ description: 'enter text here' }),
    notesList: []
  },

  setCurrentNote(value) {
    this.debug && console.log('Set Current Note:', value);
    this.state.currentNote = value;
  },

  setMessage(value) {
    this.debug && console.log('Set Message:', value);
    this.state.currentNote.description = value;
  },

  clearMessage() {
    this.debug && console.log('Clearing Message');
    this.state.currentNote = new Note({ description: '' });
  },

  setNotesList(value) {
    this.debug && console.log('Set NotesList:', value.length, 'items');
    this.state.notesList = value;
  }
};
