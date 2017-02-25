<template>
  <nav>
    <router-link class="brand" to="/">MG Editor</router-link>
    <a class="github pull-right" href="https://github.com/markgandolfo/MG-Editor"></a>
    <!-- <router-link to="/options" class="pull-right">⚙️</router-link> -->
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

nav a.github {
  height: 20px;
  width: 20px;
  margin-right: 20px;
  background-image: url(../../assets/images/github.png);
  background-size: cover;
}
</style>
