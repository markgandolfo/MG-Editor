import 'components/style.css';
import _ from 'lodash';
import AutoResizer from 'js/AutoResizer';
import Note from 'models/Note';

const Vue = require('vue');
const marked = require('marked');

const autoResizer = new AutoResizer('auto-heighter');
autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

new Vue({ // eslint-disable-line no-new
  el: '#main-content',
  data: {
    input: '# Welcome to MG Writer\nA simple note taking app that stores your notes within local storage.\n\n## Future Plans\n1. Export to PDF\n1. Export to TXT\n1. Sync to Dropbox/Drive if possible\n1. Pretty Print\n1. Resizable & Collapsable panes\n\n## Tech\nWe use webpack, vue.js and marked. View the readme on [github](https://github.com/markgandolfo/MG-Editor) for more info',
    note: null
  },

  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true });
    }
  },

  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;

      if (this.note === null) {
        this.note = new Note({ title: this.input.split('\n')[0], description: this.input });
        this.note = this.note.save();
      } else {
        this.note.description = this.input;
        this.note.title = this.input.split('\n')[0];
        this.note.save();
      }
    }, 300)
  }
});
