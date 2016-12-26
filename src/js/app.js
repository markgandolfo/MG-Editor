import 'components/style.css';
import _ from 'lodash';
import AutoResizer from 'js/AutoResizer';
import Note from 'models/Note';

const Vue = require('vue');
const marked = require('marked');

const autoResizer = new AutoResizer('auto-heighter');
autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

const vm = new Vue({ // eslint-disable-line no-new
  el: '#main-content',
  data: {
    input: '',
    note: null,
    notesList: [{ }]
  },

  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true });
    }
  },

  watch: {
    note: function (note) {
      this.input = note.description;
    }
  },

  methods: {
    loadFirstNote: function () {
      if (this.notesList.length > 0) {
        this.note = this.notesList[0];
      }
    },

    updateNoteList: function (callback) {
      const that = this;
      Note.all((notes) => {
        that.notesList = notes;
        return callback();
      });
    },

    update: _.debounce(function (e) {
      this.input = e.target.value;

      if (this.note === null) {
        this.note = new Note({ title: this.input.split('\n')[0], description: this.input });
        this.note = this.note.save();
      } else {
        this.note.description = this.input;
        this.note.title = this.input.split('\n')[0];
        this.note.save();
      }

      this.updateNoteList();
    }, 300),

    addNewNote: function () {
      this.note = new Note({ title: '', description: '' });
    },

    loadNote: function (e) {
      const noteId = e.target.getAttribute('data-note-id');
      this.note = _.find(this.notesList, { id: parseInt(noteId) });
    }
  }
});

vm.updateNoteList(() => {
  vm.loadFirstNote();
});

