import 'components/style.css';
import AutoResizer from 'js/AutoResizer';
import _ from 'lodash';

const Vue = require('vue');
const marked = require('marked');

const autoResizer = new AutoResizer('auto-heighter');

autoResizer.resize();
autoResizer.autoResizeOnWindowResize();

const vue = new Vue({
  el: '#main-content',
  data: {
    input: '# Welcome to MG Writer\nA simple note taking app that stores your notes securely within local storage.\n\n## Future Plans\n1. Export to PDF\n1. Export to TXT\n1. Sync to Dropbox/Drive if possible\n1. Pretty Print\n1. Resizable & Collapsable panes\n\n## Tech\nWe use webpack, vue.js and marked. View the readme on github for more info'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
    }, 300)
  }
});
