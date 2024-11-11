<template>
  <div class="background">
    <nav class="navbar navbar-expand-lg"
        style="background-color: rgba(0, 0, 0, 0.8); position: fixed; top: 0; width: 100%; z-index: 1000;">
        <div class="container-fluid mx-auto">
            <a class="navbar-brand" href="https://andressilva99.github.io/PerfilActual.github.io/">
                <img src="https://thumbs.dreamstime.com/b/ejemplo-principal-del-c%C3%ADrculo-le%C3%B3n-en-fondo-negro-128423055.jpg"
                    alt="Logo" width="120" height="120" class="d-inline-block align-text-top" id="icon" />
            </a>
            <button class="navbar-toggler bg-#484545 m-2" style="background-color: #ffffff" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" style="background-color: #ffffff"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item m-2">
                        <RouterLink to="/" class="nav-link text-light btn btn-dark" id="Home">Home</RouterLink>
                    </li>
                    <li class="nav-item m-2">
                        <RouterLink to="/TransactionView" class="nav-link text-light btn btn-dark" id="contacto">
                            Compra/Venta</RouterLink>
                    </li>
                    <li class="nav-item m-2">
                        <RouterLink to="/InvestmentView" class="nav-link text-light btn btn-dark" id="contacto">Estado</RouterLink>
                    </li>
                    <li class="nav-item m-2">
                        <RouterLink to="/MovementsView" class="nav-link text-light btn btn-dark" id="contacto">
                            Movimientos</RouterLink>
                    </li>
                    <li class="nav-item m-2">
                        <RouterLink to="/RegisteredView" class="nav-link text-light btn btn-dark" id="contacto">
                            Información de Almacenamiento</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view> <!-- Este es el punto donde se mostrarán los componentes enrutados -->
  </div>




</template>

<script>
export default {
    data() {
        return {
            isNavbarOpen: false
        };
    },
    methods: {
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen;
        }
    }
}
</script>

<style>
.background {
  background-image: url('@/assets/FondoBilletera.jpeg');
  background-size: cover;
  /* Para que la imagen cubra toda la pantalla con alt shif f */
  background-position: center;
  /* Para centrar la imagen */
  min-height: 100vh;
  /* Para que la imagen ocupe toda la altura de la pantalla */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
#Home {
    font-size: 25px;
}

#contacto {
    font-size: 25px;
}

#icon {
    width: 100%;
    border-radius: 50%;
}
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
