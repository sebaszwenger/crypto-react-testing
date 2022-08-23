import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";

test("<App /> Verifica el heading", () => {
  render(<App />);

  const titulo = screen.getByTestId("titulo");
  expect(titulo).toBeInTheDocument();
  expect(titulo.tagName).toBe("H1");
  expect(titulo.tagName).not.toBe("H2");
  expect(titulo.textContent).toBe("Cotiza Criptomonedas al Instante");
});
