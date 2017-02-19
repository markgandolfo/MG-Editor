import 'components/style.css';

import AutoResizer from 'js/AutoResizer';
import Vue from 'vue';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import LeftRail from 'components/vue/LeftRail.vue';
import ColumnResizer from 'components/vue/ColumnResizer.vue';
import Navbar from 'components/vue/Navbar.vue';
import MarkdownEditor from 'components/vue/MarkdownEditor.vue';
import MarkdownPreview from 'components/vue/MarkdownPreview.vue';
import _store from '../js/store';

new Vue({ // eslint-disable-line no-new
  el: '#main-content',

  components: {
    Navbar,
    ColumnResizer,
    LeftRail,
    MarkdownEditor,
    MarkdownPreview
  },

  data: {
    state: _store.state
  },

  mounted() {
    const autoResizer = new AutoResizer('auto-heighter');
    autoResizer.resize();
    autoResizer.autoResizeOnWindowResize();
    LoadingScreen.closeLoadingScreen();
  },
});
