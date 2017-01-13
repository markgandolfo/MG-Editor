<template>
  <div class="right-rail auto-heighter">
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked';
import DragResizer from 'js/DragResizer';
import _store from '../../js/store';

export default {
  data: function() {
    return {
      state: _store.state
    }
  },

  mounted: function() {
    new DragResizer('right-handle', 'right-rail', { right: true }).bind(); // eslint-disable-line no-new
  },

  computed: {
    compiledMarkdown: function () {
      return marked(this.state.message, { sanitize: true });
    }
  },
}
</script>

<style>
.right-rail {
  background: var(--main-background);
  font-family: var(--technical-font);
  border: 1px solid #efefef;
  font-size: .9rem;

  display: flex;
  flex-grow: 0;
  flex-basis:40%;
  order: 5;

  padding: 10px;
  overflow-x: scroll;
}

.right-rail > div {
  width: 100%;
}

.right-rail p:first-child {
  margin-top: 0px;
}

.right-rail h1, .right-rail h2, .right-rail h3 {
    margin: 0;
}

.right-rail h1 {
  font-size: 1.3rem;
}

.right-rail h2 {
  font-size: 1.1rem;
}

.right-rail code {
  background: #dddddd;
  color: #3a3a3a;
  padding: 1px 3px;
}

.right-rail pre code {
  display: block;
  padding: 10px;
}

.right-handle {
  order: 4;
}
</style>
