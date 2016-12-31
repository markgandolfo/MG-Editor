import 'components/style.css';
import 'sweetalert/dist/sweetalert.css';

import _ from 'lodash';
import AutoResizer from 'js/AutoResizer';
import Note from 'models/Note';
import Vue from 'vue';
import marked from 'marked';
import swal from 'sweetalert';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';

const autoResizer = new AutoResizer('auto-heighter');
autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

Vue.component('note-item', {
  template: `
    <li v-bind:class='{ active: isActive }'>
      <i class='close pull-right' title='delete' v-on:click='deleteNote'>x</i>
      <a href='#' v-on:click='openNote'>
        <div class='date'>
          {{ note.prettyDate() }}
        </div>
        <span>{{ note.title() }}</span>
      </a>
    </li>
  `,

  props: ['note'],

  computed: {
    isActive: function () {
      return this.note.id === this.$parent.note.id;
    }
  },

  methods: {
    openNote: function () {
      const clickedNoteId = parseInt(this.note.id, 10);
      this.$parent.note = _.find(this.$parent.notesList, { id: clickedNoteId });
    },

    deleteNote: function () {
      const clickedNoteId = parseInt(this.note.id, 10);
      const loadedNote = this.$parent.note.id;

      swal({
        title: 'Deleting',
        text: 'Are you sure you would like to delete?',
        cancelButtonText: 'No',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes',
        closeOnConfirm: true
      }, () => {
        Note.delete(clickedNoteId, () => {
          this.$parent.updateNoteList(() => {
            if (loadedNote === clickedNoteId) {
              this.$parent.loadFirstNote();
            }
          });
        });
      });
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
      LoadingScreen.closeLoadingScreen();
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
