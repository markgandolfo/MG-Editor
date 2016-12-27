import 'components/style.css';
import _ from 'lodash';
import AutoResizer from 'js/AutoResizer';
import Note from 'models/Note';

const Vue = require('vue');
const marked = require('marked');

const autoResizer = new AutoResizer('auto-heighter');
autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

Vue.component('note-item', {
  template: `
    <a href="#" v-on:click="openNote">
      <li>
        <div class='date'>{{ note.prettyDate() }}</div>
        <span>{{ note.title() }}</span>
      </li>
    </a>
  `,
  props: ['note'],

  methods: {
    openNote: function () {
      const clickedNoteId = parseInt(this.note.id, 10);
      this.$parent.note = _.find(this.$parent.notesList, { id: clickedNoteId });
    }
  },
});

new Vue({ // eslint-disable-line no-new
  el: '#main-content',
  data: {
    input: '',
    note: null,
    notesList: [],
  },

  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true });
    }
  },

  mounted: function () {
    this.updateNoteList(() => {
      this.loadFirstNote();
    });
  },

  watch: {
    note: function () {
      this.input = this.note.description;
    }
  },

  methods: {
    addNewNote: function () {
      this.note = new Note({ description: '' });
    },

    updateNoteList: function (callback) {
      const that = this;
      Note.all((notes) => {
        that.notesList = notes;

        return callback();
      });
    },

    loadFirstNote: function () {
      if (this.notesList.length > 0) {
        this.note = this.notesList[0];
      } else {
        this.note = new Note({ description: this.input });
      }
    },

    updatePreview: _.debounce(function (e) {
      this.input = e.target.value;

      this.note.description = this.input;
      this.note.save();

      this.updateNoteList();
    }, 300)
  }
});
