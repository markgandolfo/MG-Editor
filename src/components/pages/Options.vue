<template lang="html">
  <main role="main" class="options">
    <options-font></options-font>
  </main>
</template>

<script>
import OptionsFont from 'components/vue/OptionsFont.vue';

export default {
  components: {
    OptionsFont
  },
}
</script>

<style lang="css">
.options {
  padding-top: 20px;
}

.options form {
  width: 100%;
}

.options label {
  width: 160px;
  display: inline-block;
}

.options input[type=text] {
  width: 600px;
}
</style>
