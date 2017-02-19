<template>
  <ul class="list-group">
    <note-list-item v-for="note in store.state.notesList" :key="note.id" :note="note"></note-list-item>
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
      store: _store
    }
  },

  beforeMount: function () {
    this.updateNoteList(() => {
      this.loadFirstNote();
    });
  },

  watch: {
    'store.state.currentNote.description': function () {
      this.updateNoteList();
    },
  },

  methods: {
    updateNoteList: function (callback) {
      Note.all((notes) => {
        this.store.setNotesList(notes);

        if (callback !== undefined) {
          return callback();
        }
        return null;
      });
    },

    loadFirstNote: function () {
      if (this.store.state.notesList.length > 0) {
        this.store.setCurrentNote (this.store.state.notesList[0]);
        this.store.setMessage(this.store.state.notesList[0].description);
      } else {
        this.store.setCurrentNote(new Note({ description: Note.defaultNote() }));
      }
    },
  }
}
</script>
