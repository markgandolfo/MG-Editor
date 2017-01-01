export default class DragResizer {
  constructor(handleElement, variableElement, options = {}) {
    this.options = Object.assign({ right: false }, options);
    this.handleElement = window.document.getElementsByClassName(handleElement)[0];
    this.variableElement = window.document.getElementsByClassName(variableElement)[0];
  }

  bind() {
    const handleEvent = {
      handleEvent: this._movemouse,
      variableElement: this.variableElement,
      options: this.options,
      self: this
    };

    this.handleElement.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', handleEvent, false);
    });

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleEvent, false);
    });
  }

  _movemouse(event) {
    let newWidth = 0;

    this.self._preventSelection();

    if (this.options.right) {
      newWidth = window.innerWidth - event.clientX - 45;
    } else {
      newWidth = event.clientX - 24;
    }
    this.variableElement.style.flexBasis = `${newWidth}px`;
  }

  _preventSelection() {
    if (window.document.selection) {
      window.document.selection.empty();
    } else {
      window.getSelection().removeAllRanges();
    }
  }
}
