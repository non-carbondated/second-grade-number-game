import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import NumberCard from "./NumberCard";

const testingProps = {
  id: "123iu4h",
  value: 9
};

const renderNumberCard = (props) => {
  return render(<NumberCard {...props} />);
};

describe("NumberCard", () => {
  afterEach(cleanup);

  test("renders a number card with a number, add button and subtract button", () => {
    renderNumberCard(testingProps);

    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subtract" })
    ).toBeInTheDocument();
    expect(screen.getByText("-")).not.toBeInTheDocument();
    expect(screen.getByText("+")).not.toBeInTheDocument();
  });
});
