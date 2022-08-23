import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Formulario from "../components/Formulario";

test("<Formulario /> Verifica los Selects", () => {
  render(<Formulario />);

  const monedasDropdown = screen.getByTestId("select-monedas");
  expect(monedasDropdown).toBeInTheDocument();
  const criptosDropdown = screen.getByTestId("select-criptos");
  expect(criptosDropdown).toBeInTheDocument();
});

test("<Formulario /> Verifica mensaje de error", () => {
  render(<Formulario />);

  //Verifica el boton de submit
  const btnSubmit = screen.getByTestId("btnSubmit");
  expect(btnSubmit).toBeInTheDocument();

  //Simula click
  userEvent.click(btnSubmit);

  //Verifica error
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error.tagName).toBe("P");
  expect(error.tagName).not.toBe("H2");
  expect(error.textContent).toBe("Todos los campos son obligatorios");
});
