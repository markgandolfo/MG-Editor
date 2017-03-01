<template lang="html">
  <div class="left-rail auto-heighter">
    <anchor-button :onClick="addNewNote">New Note</anchor-button>

    <note-list></note-list>
  </div>
</template>

<script>
import Note from 'models/Note';
import AnchorButton from 'components/vue/AnchorButton.vue';
import NoteList from 'components/vue/NoteList.vue';

export default {
  components: {
    AnchorButton,
    NoteList
  },

  computed: {
    store: function() {
      return this.$root.$data.store;
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

</style>
