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
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';
import _ from 'lodash';
import Note from 'models/Note';
import _swalDeleteConfig from 'config/swal_config.js';

export default {
  props: ['note'],

  computed: {
    isActive: function () {
      return this.note.id === this.store.state.currentNote.id;
    },

    store: function () {
      return this.$root.$data.store;
    }
  },

  methods: {
    openNote: function () {
      this.store.setCurrentNote(this.note);
      this.store.setMessage(this.store.state.currentNote.description);
    },

    deleteNote: function () {
      const clickedNoteId = parseInt(this.note.id, 10);

      swal(_swalDeleteConfig, () => {
        const _this = this;
        Note.delete(clickedNoteId, () => {
          this._loadFirstAvailableNote(clickedNoteId);
        });
      });
    },

    _loadFirstAvailableNote(recentlyDeletedId) {
      if (this.store.state.currentNote.id === recentlyDeletedId) {
        const newNote = _.find(this.store.state.notesList, function (note) {
          return note.id !== recentlyDeletedId;
        });

        this.store.getCurrentNote(newNote);
        this.store.setMessage(newNote.description);
      }
    }

  },
}
</script>

<style>
.left-rail div.date {
  color: #5b5b5b;
}

.left-rail li > a {
  color: #5b5b5b;
  text-decoration: none;
  font-size: .8rem;
}

.left-rail ul {
  list-style: none;
  margin: 0;
  padding: 2px;
}

.left-rail li {
  padding: 10px;
  margin-bottom: 10px;
  display: block;
  border-bottom: 1px solid #efefef;
  border-radius: 2px;
  max-width: 250px;
}

.left-rail li.active {
  background: rgba(150, 150, 208, 0.07);
  border-bottom: 1px solid rgba(115, 179, 204, 0.43)
}

.left-rail .pull-right {
  float: right;
}

.left-rail .close {
  visibility: hidden;
  cursor: pointer;
}

.left-rail li:hover .close {
  visibility: visible;
}
</style>
