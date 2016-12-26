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

  methods: {
    loadFirstNote: function () {
      if (this.notesList.length > 0) {
        this.note = this.notesList[0];
        this.input = this.notesList[0].description;
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
      this.input = '';
      this.note = new Note({ title: '', description: '' });
    },

    loadNote: function (e) {
      console.log(e);
    }
  }
});

vm.updateNoteList(() => {
  vm.loadFirstNote();
});

