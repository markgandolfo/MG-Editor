import _ from 'lodash';

export default class AutoResizer {
  constructor(element) {
    this.elAutoHeighters = window.document.getElementsByClassName(element);
  }

  autoResizeOnWindowResize() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    _.forEach(this.elAutoHeighters, (element) => {
      const scopedElement = element;
      scopedElement.style.height = `${window.screen.height - 40}px`;
    });
  }
}
