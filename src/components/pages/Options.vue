<template lang="html">
  <div>
    <navbar></navbar>
    <main role="main" class="options">
      <options-font></options-font>
    </main>
  </div>
</template>

<script>
import Navbar from 'components/vue/Navbar.vue';
import OptionsFont from 'components/vue/OptionsFont.vue';

export default {
  components: {
    Navbar,
    OptionsFont
  },

  mounted() {
    console.log(this);
  }
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
