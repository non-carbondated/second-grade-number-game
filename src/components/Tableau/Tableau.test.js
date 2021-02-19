import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tableau from "./Tableau";

const renderTableau = () => {
  return render(<Tableau />);
};

describe("Tableau", () => {
  afterEach(cleanup);

  describe("renders a tableau initial state", () => {
    test('Pass button is enabled', () => {
      renderTableau();

      expect(screen.getByRole('button', { name: 'Pass' })).not.toBeDisabled()
    })

    test('Submit button is disabled', () => {
      renderTableau();

      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
    })

    test('Feedback emoji is 🤔', () => {
      renderTableau()

      expect(screen.getByText('🤔')).toBeInTheDocument()
    })

    test('Total points are set to 0', () => {
      renderTableau()

      expect(screen.getByText('Total points: 0')).toBeInTheDocument()
    })

    test('Reset Points button is not rendered', () => {
      renderTableau()

      expect(screen.queryByRole('button', { name: 'Reset points' })).not.toBeInTheDocument()
    })
  });
});
