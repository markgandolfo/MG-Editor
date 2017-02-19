<template>
  <textarea
    class="main-content auto-heighter"
    v-model="state.message"
    @input="update" >
  </textarea>
</template>

<script>
import _ from 'lodash';
import _store from '../../js/store';

export default {
  data: function() {
    return {
      state: _store.state
    }
  },

  methods: {
    update: _.debounce(function (e) {
      this.state.currentNote.description = this.state.message = e.target.value;
      this.state.currentNote.save();
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
    /*order: 3;*/

    font-size: .9rem;
    line-height: 1.5rem;
  }
</style>
