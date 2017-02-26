<template>
  <textarea
    class="main-content auto-heighter"
    v-model="store.state.currentNote.description"
    @input="update"
    v-bind:style="{ 'font-family': this.store.state.font }"
    placeholder="Start typing here" >
  </textarea>
</template>

<script>
import _ from 'lodash';

export default {
  computed: {
    store: function() {
      return this.$root.$data.store;
    }
  },

  methods: {
    update: _.debounce(function (e) {
      this.store.setMessage(e.target.value);
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
