<template>
  <li v-bind:class='{ active: isActive }'>
    <i class='close pull-right' title='delete' v-on:click='deleteNote'>x</i>
    <a href='#' v-on:click='openNote'>
      <div class='date'>
        {{ note.prettyDate() }}
      </div>
      <span>{{ note.title() }}</span>
    </a>
  </li>
</template>

<script>
import swal from 'sweetalert';
import Note from '../../models/Note';

export default {
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
}
</script>
