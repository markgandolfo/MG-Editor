<template>
  <ul class="list-group">
    <note-list-item v-for="note in state.notesList" :key="note.id" :note="note"></note-list-item>
  </ul>
</template>

<script>
import _store from 'js/store';
import Note from 'models/Note';
import NoteListItem from 'components/vue/NoteListItem.vue';

export default {
  components: {
    NoteListItem
  },

  data() {
    return {
      state: _store.state
    }
  },

  beforeMount: function () {
    this.updateNoteList(() => {
      this.loadFirstNote();
    });
  },

  watch: {
    'state.currentNote.description': function () {
      this.updateNoteList();
    },

    'state.notesList': function () {
      this.updateNoteList();
    }
  },

  methods: {
    updateNoteList: function (callback) {
      Note.all((notes) => {
        this.state.notesList = notes;

        if (callback !== undefined) {
          return callback();
        }
        return null;
      });
    },

    loadFirstNote: function () {
      if (this.state.notesList.length > 0) {
        this.state.currentNote = this.state.notesList[0];
        this.state.message = this.state.notesList[0].description;
      } else {
        this.state.currentNote = new Note({ description: Note.defaultNote() });
      }
    },
  }
}
</script>
