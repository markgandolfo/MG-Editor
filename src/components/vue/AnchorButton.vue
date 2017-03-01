<template lang="html">
  <a href="#" v-on:click="onClick" class="btn">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: [ 'onClick' ]
}
</script>

<style lang="css">
a.btn, a.btn:visited, a.btn:link {
  text-align: center;
  border-radius: .3em;
  border-style: solid;
  border-width: 1px;
  color: #111;
  font-family: avenir,helvetica,arial,sans-serif;
  letter-spacing: .15em;
  margin: .5em;
  padding: .5em .75em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color .4s,background-color .4s,border .4s;
  font-size: .8rem;
  display: block;
  max-width: 200px;
}

a.btn:active {
  color: #0074D9;
  border: 1px solid #6e94b5;
  transition: background-color .3s,color .3s,border .3s;
}

a.btn:hover, a.btn:focus {
  color: #357e9b;
  border: 1px solid #3c788f;
  transition: background-color .3s,color .3s,border .3s;
}

</style>
