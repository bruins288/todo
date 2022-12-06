import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Фронтенд/);
  for (let linkElement of linkElements) {
    expect(linkElement).toBeInTheDocument();
  }
});
