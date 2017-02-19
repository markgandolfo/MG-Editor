<template lang="html">
  <div>
    <div class="left-rail auto-heighter">
      <a href="#" class="new-note btn" v-on:click="addNewNote">New Note</a>
      <note-list></note-list>
    </div>
  </div>
</template>

<script>
import Note from 'models/Note';
import NoteList from 'components/vue/NoteList.vue';
import _store from 'js/store';

export default {
  components: {
    NoteList
  },

  data() {
    return {
      store: _store
    }
  },

  methods: {
    addNewNote: function () {
      this.store.setCurrentNote(new Note({ description: '' }));
      this.store.clearMessage();
    }
  }
}
</script>

<style lang="css">
.left-rail {
  background-color: #fbfbfb;
  text-align: left;
  flex-grow: 0;
  flex-basis: 200px;
  padding: 10px;
  border: 1px solid #efefef;
}

.left-rail a.btn, .left-rail a.btn:visited, .left-rail a.btn:link {
  text-align: center;
  border-radius: .3em;
  border-style: solid;
  border-width: 1px;
  color: #111;
  font-family: avenir,helvetica,arial,sans-serif;
  letter-spacing: .15em;
  margin: .5em auto;
  padding: .5em .75em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color .4s,background-color .4s,border .4s;
  font-size: .8rem;
  display: block;
  max-width: 200px;
}

.left-rail a.btn:active {
  color: #0074D9;
  border: 1px solid #6e94b5;
  transition: background-color .3s,color .3s,border .3s;
}

.left-rail a.btn:hover, .left-rail a.btn:focus {
  color: #357e9b;
  border: 1px solid #3c788f;
  transition: background-color .3s,color .3s,border .3s;
}
</style>
