export default {
  debug: process.env.NODE_ENV !== 'production' || false,

  state: {
    message: '',
    currentNote: null,
    notesList: []
  },

  setCurrentNote(value) {
    this.debug && console.log('Set Current Note:', value);
    this.state.currentNote = value;
  },

  setMessage(value) {
    this.debug && console.log('Set Message:', value);
    this.state.message = value;
  },

  clearMessage() {
    this.debug && console.log('Clearing Message');
    this.state.message = '';
  },
};
