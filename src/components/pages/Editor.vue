<template lang="html">
  <div>
    <navbar></navbar>
    <main role="main">
      <left-rail></left-rail>
      <column-resizer grow-direction="left"></column-resizer>
      <markdown-editor></markdown-editor>
      <column-resizer grow-direction="right"></column-resizer>
      <markdown-preview></markdown-preview>
    </main>
  </div>
</template>

<script>
import AutoResizer from 'js/AutoResizer';

import Navbar from 'components/vue/Navbar.vue';
import ColumnResizer from 'components/vue/ColumnResizer.vue';
import LeftRail from 'components/vue/LeftRail.vue';
import MarkdownEditor from 'components/vue/MarkdownEditor.vue';
import MarkdownPreview from 'components/vue/MarkdownPreview.vue';

export default {
  components: {
    Navbar,
    ColumnResizer,
    LeftRail,
    MarkdownEditor,
    MarkdownPreview
  },

  mounted() {
    const autoResizer = new AutoResizer('auto-heighter');
    autoResizer.resize();
    autoResizer.autoResizeOnWindowResize();
  },

}
</script>

<style lang="css">
</style>
