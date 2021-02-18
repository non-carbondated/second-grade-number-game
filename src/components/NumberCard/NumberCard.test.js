import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("renders a number card initial state with a number, add button and subtract button", () => {
    renderNumberCard(testingProps);

    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subtract" })
    ).toBeInTheDocument();
    expect(screen.queryByText(/^\-$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\+$/)).not.toBeInTheDocument();
  });

  test("renders a minus sign before the number when the subtract button is clicked", () => {
    renderNumberCard(testingProps);

    userEvent.click(screen.getByRole('button', { name: 'Subtract' }))

    expect(screen.getByText(/^\-$/)).toBeInTheDocument()
    expect(screen.queryByText(/^\+$/)).not.toBeInTheDocument();
  })

  test("renders a plus sign before the number when the add button is clicked", () => {
    renderNumberCard(testingProps);

    userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText(/^\+$/)).toBeInTheDocument()
    expect(screen.queryByText(/^\-$/)).not.toBeInTheDocument();
  })

  test('replaces the Add and Subtract buttons with a single Undo button when Add button is clicked', () => {
    renderNumberCard(testingProps)

    userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Subtract" })
    ).not.toBeInTheDocument();
  })

  test('replaces the Add and Subtract buttons with a single Undo button when Subtract button is clicked', () => {
    renderNumberCard(testingProps)

    userEvent.click(screen.getByRole('button', { name: 'Subtract' }))

    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Subtract" })
    ).not.toBeInTheDocument();
  })

  test('reverts number card to initial state when the Undo button is clicked', () => {
    renderNumberCard(testingProps)

    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    userEvent.click(screen.getByRole('button', { name: 'Undo' }))

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subtract" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Undo" })).not.toBeInTheDocument();
    expect(screen.queryByText(/^\-$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\+$/)).not.toBeInTheDocument();
  })
});
