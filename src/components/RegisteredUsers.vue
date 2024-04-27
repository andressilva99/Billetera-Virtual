<template>
  <div class="background">
    <div class="container">
      <h1>INFORMACIÓN DE ALMACENAMIENTO ID</h1>
      <p>Se utiliza LocalStorage por lo cual su ID quedara almacenado solo temporalmente en el equipo que inicio sección
        es una función de JavaScript esta API permite a las aplicaciones web almacenar datos en el navegador del usuario
        de manera persistente. Utiliza pares clave-valor para almacenar la información y proporciona métodos simples
        como setItem() y getItem() para guardar y recuperar datos. Aunque tiene algunas limitaciones, como un límite de
        almacenamiento y la incapacidad de almacenar datos complejos, sigue siendo una herramienta útil para almacenar
        datos simples en el navegador del usuario.</p>
    </div>
  </div>
</template>
<ul>

  </ul>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(["usuarios"]),
  },
};
</script>

<style scoped>
.background {
  background-image: url('https://www.xtrafondos.com/wallpapers/bitcoin-criptomonedas-6876.jpg');
  background-size: cover;
  /* Para que la imagen cubra toda la pantalla */
  background-position: center;
  /* Para centrar la imagen */
  min-height: 100vh;
  /* Para que la imagen ocupe toda la altura de la pantalla */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 90%;
  /* Ajusta el ancho del contenedor al 90% del viewport width */
  max-width: 1000px;
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo semi-transparente */
  color: black;
  /* Color de texto */
  margin-top: 200px;
  /* Ajusta la distancia desde la parte superior */
  animation: moveFromTop 1s ease;
  /* Animación que viene desde arriba */
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

  /* Estilos para dispositivos con un ancho máximo de 768px */
  .container {
    width: 90%;
    margin-top: 200px;
    /* Ajusta el margen superior para dispositivos móviles */
    margin-bottom: 80px;
  }
}

#button {
  margin-top: 20px;
  /* Agrega un margen superior entre los botones */
  margin-right: 10px;
  /* Agrega un margen derecho entre los botones */
}
</style>
