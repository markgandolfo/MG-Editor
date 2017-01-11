import 'components/style.css';
import 'sweetalert/dist/sweetalert.css';

import _ from 'lodash';
import AutoResizer from 'js/AutoResizer';
import DragResizer from 'js/DragResizer';
import Note from 'models/Note';
import Vue from 'vue';
import marked from 'marked';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import NoteItem from 'components/NoteListItem/NoteListItem.vue';

const autoResizer = new AutoResizer('auto-heighter');
autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

new Vue({ // eslint-disable-line no-new
  el: '#main-content',

  components: {
    NoteItem
  },

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
      LoadingScreen.closeLoadingScreen();
      new DragResizer('left-handle', 'left-rail').bind(); // eslint-disable-line no-new
      new DragResizer('right-handle', 'right-rail', { right: true }).bind(); // eslint-disable-line no-new
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

        if (callback !== undefined) {
          return callback();
        }
        return null;
      });
    },

    loadFirstNote: function () {
      if (this.notesList.length > 0) {
        this.note = this.notesList[0];
      } else {
        this.note = new Note({ description: Note.defaultNote() });
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
