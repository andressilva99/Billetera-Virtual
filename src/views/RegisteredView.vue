<template>
  <div class="home">
    <NavBar />
    
      <div class="container">
        <h1>INFORMACIÓN DE ALMACENAMIENTO ID</h1>
        <p>
          Se utiliza LocalStorage por lo cual su ID quedará almacenado solo temporalmente en el equipo que inició sesión.
          Es una función de JavaScript, esta API permite a las aplicaciones web almacenar datos en el navegador del usuario de manera persistente.
          Utiliza pares clave-valor para almacenar la información y proporciona métodos simples como `setItem()` y `getItem()` para guardar y recuperar datos.
          Aunque tiene algunas limitaciones, como un límite de almacenamiento y la incapacidad de almacenar datos complejos, sigue siendo una herramienta útil para almacenar datos simples en el navegador del usuario.
        </p>
      </div>
    </div>
  
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'RegisteredView',
  
  computed: {
    ...mapState(["usuarios"]),
  },
};
</script>

<style scoped>
.background {
  background-image: url('https://www.xtrafondos.com/wallpapers/bitcoin-criptomonedas-6876.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 90%;
  max-width: 1000px;
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  margin-top: 200px;
  animation: moveFromTop 1s ease;
}

h1 {
  margin-bottom: 30px;
}

@keyframes moveFromTop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container {
    width: 90%;
    margin-top: 200px;
    margin-bottom: 80px;
  }
}

#button {
  margin-top: 20px;
  margin-right: 10px;
}
</style>
