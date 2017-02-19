<template>
  <textarea
    class="main-content auto-heighter"
    v-model="store.state.message"
    @input="update" >
  </textarea>
</template>

<script>
import _ from 'lodash';
import _store from 'js/store';

export default {
  data: function() {
    return {
      store: _store
    }
  },

  methods: {
    update: _.debounce(function (e) {
      this.store.setMessage(e.target.value);
      this.store.state.currentNote.description = this.store.state.message;
      this.store.state.currentNote.save();
    }, 300),
  },
}
</script>

<style>
  .main-content {
    background: var(--main-background);
    font-family: var(--technical-font);
    color: var(--font-color);
    border: 1px solid #efefef;
    text-align: left;
    flex-grow: 1;
    color: black;
    padding: 10px;

    font-size: .9rem;
    line-height: 1.5rem;
  }
</style>
