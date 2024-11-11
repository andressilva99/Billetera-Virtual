<template>
  <div class="home">
    <NavBar />
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Elemento de animación para el icono de usuario -->
        <div class="fadeIn first">
          <!-- Icono de usuario -->
          <img
            src="https://thumbs.dreamstime.com/b/ejemplo-principal-del-c%C3%ADrculo-le%C3%B3n-en-fondo-negro-128423055.jpg"
            id="icon" alt="User Icon" />
        </div>

        <!-- Formulario de inicio de sesión -->
        <form @submit.prevent="generarIdUsuario">
          <!-- Campo de entrada para el correo electrónico -->
          <input v-model.trim="Email" type="email" id="login" class="fadeIn second" name="login"
            placeholder="Enter email">
          <!-- Botón para generar el ID de usuario -->
          <button type="submit" class="btn btn-primary" id="generate" :disabled="idCopiada || !validacionNombre"
            :class="{ 'copiado': idCopiada }">
            {{ idCopiada ? '✔' : 'Generate User ID' }}
          </button>
          <!-- Mostrar el ID de usuario generado -->
          <p v-if="idUsuario">Generated User ID: {{ idUsuario }}</p>
        </form>

        <!-- Enlace para recuperar contraseña 
        <div id="formFooter">
          <a class="underlineHover" href="#">Forgot Password?</a>
        </div>
        -->
      </div>
    </div>
  </div>
</template>


<script>
import { mapMutations, mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'LoginView',
  data() {
    return {
      Email: "", // Correo electrónico ingresado por el usuario
      idUsuario: "", // ID de usuario generado
      idCopiada: false, // Estado de copiado del ID de usuario
      idsGeneradas: new Set(), // Conjunto para almacenar IDs generados
    };
  },

  methods: {
    // Genera un ID único utilizando UUID
    generarIdUnica() {
      let idNueva = uuidv4(); // Genera un nuevo UUID
      // Asegura que el UUID generado sea único
      while (this.idsGeneradas.has(idNueva)) {
        idNueva = uuidv4(); // Genera un nuevo UUID si el generado ya existe
      }
      return idNueva; // Devuelve el UUID único
    },

    // Genera y guarda un nuevo ID de usuario
    generarIdUsuario() {
      const idNueva = this.generarIdUnica(); // Genera un nuevo ID único
      localStorage.setItem('idUsuario', idNueva); // Almacena el ID en el almacenamiento local
      this.idsGeneradas.add(idNueva); // Agrega el ID al conjunto de IDs generados
      this.idUsuario = idNueva; // Asigna el ID generado al componente
      const nuevoUsuario = {
        Email: this.Email, // Suponiendo que hay una variable Nombre
        idUsuario: this.idUsuario,
      };
      this.copiarId(); // Copia el ID de usuario al portapapeles
      this.idCopiada = true; // Actualiza el estado de copia
      this.agregarUsuario(nuevoUsuario); // Agrega el nuevo usuario al estado global
    },

    // Copia el ID de usuario al portapapeles
    copiarId() {
      const idACopiar = this.idUsuario; // Obtiene el ID de usuario
      // Utiliza la API del portapapeles para copiar el texto
      navigator.clipboard.writeText(idACopiar)
        .then(() => {
          console.log('ID copiado al portapapeles');
        })
        .catch((error) => {
          console.error('Error al copiar el ID:', error);
        });
    },
    ...mapMutations(['agregarUsuario']), // Mapea la mutación 'agregarUsuario' del almacenamiento Vuex
  },

  computed: {
    ...mapState(["usuarios"]), // Mapea el estado 'usuarios' del almacenamiento Vuex
    // Validación del correo electrónico
    validacionNombre() {
      return this.Email.trim() !== ''; // Verifica si el correo electrónico no está vacío después de recortar los espacios en blanco
    },
  },
}
</script>
<style scoped>
.background {
  background-image: url('https://www.xtrafondos.com/wallpapers/bitcoin-criptomonedas-6876.jpg');
  background-size: cover;
  /* Para que la imagen cubra toda la pantalla */
  background-position: center;
  /* Para centrar la imagen */
  height: 100vh;
  /* Para que la imagen ocupe toda la altura de la pantalla */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  /* Evita que el contenido se desplace más allá de los límites */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo semi-transparente */
  backdrop-filter: blur(10px);
  /* Efecto de desenfoque en el fondo */

}

html {
  background-color: #56baed;


}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;

}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 110%;
  padding: 20px;
  margin-top: 40px;
  /* Ajusta este valor según sea necesario para desplazar el formulario hacia abajo */

}

#formContent {
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo semi-transparente */
  backdrop-filter: blur(10px);
  /* Efecto de desenfoque en el fondo */
  padding: 30px;
  width: 90%;
  max-width: 500px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button],
input[type=submit],
input[type=reset] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover,
input[type=submit]:hover,
input[type=reset]:hover {
  background-color: #39ace7;
}

input[type=button]:active,
input[type=submit]:active,
input[type=reset]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;


}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

#generate {
  margin-left: 10px;
  /* Agrega un margen izquierdo */
}

#login {
  margin-top: 30px;
  /* Agrega un margen superior de 20px */
  margin-bottom: 50px;

}



/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
  border-radius: 50%;
  margin-top: 30px;
}
</style>
