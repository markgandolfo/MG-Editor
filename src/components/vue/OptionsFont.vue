<template lang="html">
  <form>
    <fieldset>
      <legend>Choose a font</legend>
      <basic-select :options="fontOptions"
                    :selected-option="selectedFont"
                    placeholder="Select a font"
                    @select="onSelect">
      </basic-select>
      <p>
        <input type="button" v-on:click="submit" value="save" />
      </p>
    </fieldset>
  </form>
</template>

<script>
import { BasicSelect } from 'vue-search-select';
import Config from 'models/Config';
import fontOptions from 'data/web_fonts.js';

export default {
  components: {
    BasicSelect
  },

  data: function() {
    return {
      fontOptions,
      font: null,
      woot: null
    }
  },

  computed: {
    store: function() {
      return this.$root.$data.store;
    },

    selectedFont: function() {
      return( { id: this.store.state.font, text: this.store.state.font } );
    }
  },

  methods: {
    onSelect (item) {
      this.store.state.font = item.text;
    },

    submit: function() {
      Config.getByType('font', (config) => {
        if (config.length > 0) {
          config[0].configuration.font = this.store.state.font;
          config[0].save();
          this.$router.push('/');
        } else {
          new Config({
            type: 'font',
            configuration: {
              font: this.store.state.font
            }
          }).save();
          this.$router.push('/');
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
fieldset {
  /*width: 50%;*/
  display: block;
  overflow: visible;
}
.ui.fluid.dropdown {
  width: auto;
  line-height: 1;
  padding: 10px 20px;
  margin: 0;
  height: auto;
  min-height: inherit;
}
</style>
