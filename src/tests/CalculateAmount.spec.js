// Obtén las funciones necesarias para la prueba
const { calcularMonto } = require('../components/TransactionForm.vue');

// Mockear la función axios para simular la respuesta
jest.mock('axios');
const axios = require('axios');

describe('calcularMonto', () => {
  it('should calculate the amount correctly when tipoDeOperacion is comprar', async () => {
    // Configurar el estado de la prueba
    const instance = {
      criptomonedas: [{ id: 1 }],
      criptomonedaSeleccionada: 1,
      cantidad: 5,
      tipoDeOperacion: 'comprar',
      precios: {},
      monto: 0,
    };

    // Mockear la respuesta de la solicitud HTTP con axios
    axios.get.mockResolvedValue({ data: { ask: 10 } });

    // Llamar a la función calcularMonto
    await calcularMonto.call(instance);

    // Verificar que el monto se haya calculado correctamente
    expect(instance.monto).toBe('50.00'); // Comprobar el monto esperado
  });

  it('should handle error when getting monto in pesos', async () => {
    // Configurar el estado de la prueba
    const instance = {
      criptomonedas: [{ id: 1 }],
      criptomonedaSeleccionada: 1,
      cantidad: 5,
      tipoDeOperacion: 'comprar',
      precios: {},
      monto: 0,
    };

    // Simular un error en la solicitud HTTP con axios
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    // Llamar a la función calcularMonto
    await calcularMonto.call(instance);

    // Verificar que el monto sigue siendo 0 debido al error
    expect(instance.monto).toBe(0);

    // Verificar que se haya mostrado un mensaje de error en la consola
    expect(console.error).toHaveBeenCalled();
  });
});