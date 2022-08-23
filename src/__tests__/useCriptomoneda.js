import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Formulario from "../components/Formulario";
import { monedas, criptos } from "../__mocks__/criptomonedas";
import axios from "axios";

const mockAxios = axios;
const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();

test("<useCriptomoneda /> Verifica los Selects de monedas y criptomonedas", async () => {
  render(
    <Formulario
      guardarMoneda={guardarMoneda}
      guardarCriptomoneda={guardarCriptomoneda}
    />
  );
  //Consumimos datos falsos
  mockAxios.get = jest.fn().mockResolvedValue({
    data: criptos,
  });

  //Verificamos la cantidad de opciones de monedas
  const monedasDropdown = screen.getByTestId("select-monedas");
  expect(monedasDropdown).toBeInTheDocument();
  expect(monedasDropdown.children.length).toEqual(monedas.length + 1);

  //Verificar la cantidad de opciones de las criptomonerdas
  const opciones = screen.findAllByTestId("opcion-cripto");
  expect(await opciones).toHaveLength(10);

  //Verificamos que la llamada a la api se haya efectuado
  setTimeout(() => {
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  }, 100);

  //Seleccionar Bitcoin u USD
  userEvent.selectOptions(screen.getByTestId("select-monedas"), "USD");
  userEvent.selectOptions(screen.getByTestId("select-criptos"), "BTC");

  //Simulamos el submit
  userEvent.click(screen.getByTestId("btnSubmit"));

  //Verificar que las funciones se hayan llamado
  expect(guardarMoneda).toHaveBeenCalled();
  expect(guardarMoneda).toHaveBeenCalledTimes(1);
  expect(guardarCriptomoneda).toHaveBeenCalled();
  expect(guardarCriptomoneda).toHaveBeenCalledTimes(1);
});
