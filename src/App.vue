<template>
  <div class="header">
    <router-view></router-view> <!-- Este es el punto donde se mostrarán los componentes enrutados -->
  </div>




</template>

<script>
export default {
  name: 'App',
  // Otros componentes, datos y métodos pueden ir aquí si es necesario
  //node_modules/.bin/vue-cli-service serve
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
