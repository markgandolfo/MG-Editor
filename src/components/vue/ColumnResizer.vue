<template lang="html">
  <div class="handle auto-heighter"></div>
</template>

<script>
export default {
  props: ['grow-direction'],

  mounted() {
    this._mousemove = this._mousemove.bind(this);

    if (this.growDirection === 'right') {
      this.growElement = this.$el.nextElementSibling;
    } else {
      this.growElement = this.$el.previousElementSibling;
    }

    const handleEvent = {
      handleEvent: this._mousemove,
      variableElement: this.growElement,
      self: this
    };

    this.$el.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', handleEvent, false);
    });

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleEvent, false);
    });
  },

  methods: {
    _mousemove: function (event) {
      let newWidth = 0;

      if (this.growDirection === 'right') {
        newWidth = window.innerWidth - event.clientX - 45;
      } else {
        newWidth = event.clientX;
      }

      this.growElement.style.flexBasis = `${newWidth}px`;
      window.getSelection().removeAllRanges();
    }
  }
}
</script>

<style lang="css">
.handle {
  border: 1px dotted #ccc;
  cursor: col-resize;
}
</style>
