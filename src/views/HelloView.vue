<template>
  <div class="home">
    
    
    <div class="container">
      <h1>DZATACOINS</h1>
      <p>Bienvenido a dzatacoins, tu plataforma de confianza para comprar y vender criptomonedas. Aquí podrás encontrar
        una amplia variedad de criptoactivos y realizar transacciones de forma segura y rápida. Nuestra plataforma
        cuenta con las últimas medidas de seguridad para proteger tus activos digitales y ofrecerte una experiencia sin
        igual en el mundo de las criptomonedas. ¡Regístrate ahora y comienza a operar!</p>
      <p>¡Para comenzar a operar en Dzatacoins, es necesario que te registres utilizando tu dirección de correo
        electrónico. Una vez registrado, recibirás un ID único que deberás guardar y en cada página de la plataforma
        para acceder y realizar tus operaciones debes ingresarlo. Este ID garantiza la seguridad de tus transacciones y
        te proporciona acceso exclusivo a tu cuenta. Regístrate hoy mismo y empieza a operar con total confianza y
        comodidad!</p>
      <RouterLink to="/LoginView" id="button" class="btn btn-primary">Registrarse</RouterLink>
    </div>
  

  </div>
</template>

<script>



export default {
  name: 'HelloView',
    
  props: {
    msg: String
  }

}
</script>

<style scoped>


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
