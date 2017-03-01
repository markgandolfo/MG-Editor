<template>
  <nav>
    <router-link class="brand" to="/">MG Editor</router-link>
    <a class="icon github-icon pull-right" href="https://github.com/markgandolfo/MG-Editor"></a>
    <router-link class="icon options-icon pull-right" to="/options"></router-link>
  </nav>
</template>

<style>
nav {
  width: 100%;
  padding: 10px;
  box-shadow: 0 1px 10px rgba(0,0,0,.1);
  font-size: 14px;
  line-height: 20px;
  color: ##4e4e4e;
  background: #eeeeee;
}

nav a {
  color: #333333;
  text-decoration: none;
}

nav .pull-right {
  float: right;
  margin-right: 15px;
}

nav a.icon {
  height: 20px;
  width: 20px;
  margin-right: 20px;
  background-size: cover;
}

nav a.github-icon {
  background-image: url(../../assets/images/github.png);
}

nav a.options-icon {
  background-image: url(../../assets/images/settings.png);
}
</style>
