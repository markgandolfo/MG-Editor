import 'components/style.css';

import AutoResizer from 'js/AutoResizer';
import DragResizer from 'js/DragResizer';
import Note from 'models/Note';
import Vue from 'vue';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import NoteList from 'components/vue/NoteList.vue';
import MarkdownEditor from 'components/vue/MarkdownEditor.vue';
import MarkdownPreview from 'components/vue/MarkdownPreview.vue';
import _store from '../js/store';

new Vue({ // eslint-disable-line no-new
  el: '#main-content',

  components: {
    NoteList,
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
    new DragResizer('left-handle', 'left-rail').bind(); // eslint-disable-line no-new
  },

  methods: {
    addNewNote: function () {
      this.state.currentNote = new Note({ description: '' });
      this.state.message = '';
    },
  }
});
