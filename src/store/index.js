import { createStore } from "vuex";

export default createStore({
  state: {
    // Estado para almacenar la lista de usuarios registrados
    usuarios: [],
  },
  getters: {},
  mutations: {
    // Mutación para agregar un nuevo usuario al estado
    agregarUsuario(state, usuario) {
      // Usamos push para agregar el nuevo usuario al final del array de usuarios
      state.usuarios.push(usuario);
    },
  },
  actions: {},
  modules: {},
});
