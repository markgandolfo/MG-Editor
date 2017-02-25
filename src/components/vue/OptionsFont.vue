<template lang="html">
  <form>
    <fieldset>
      <legend>Config</legend>
      <p>
        <label for="technicalFont">Font</label>
        <input v-model="store.state.font" type="text" name="technicalFont" />
      </p>
      <p>
        <input type="button" v-on:click="submit" value="save" />
      </p>
    </fieldset>
  </form>
</template>

<script>
import Config from 'models/Config';

export default {
  computed: {
    store: function() {
      return this.$root.$data.store;
    }
  },

  methods: {
    submit: function() {
      const config = new Config({
        type: 'font',
        configuration: {
          font: this.store.font
        }
      });

      config.save();
    }
  }
}
</script>

<style lang="css">
</style>
