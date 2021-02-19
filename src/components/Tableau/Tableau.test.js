import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tableau from "./Tableau";

const testingProps = {
  points: 0,
  randomFive: [
    {id: "cc409502-f7ee-8ee2-3bc0-4cceb5ff9f9c", value: 5},
    {id: "94a3a918-6c7a-9702-76ea-bd525f8705c2", value: 0},
    {id: "3efbd24f-de86-3112-e311-2a74519e1a4e", value: 6},
    {id: "cdd11456-152f-e22c-6604-a4745ea1fb8a", value: 7},
    {id: "c4e2c216-a9e1-56b7-d881-746879a37606", value: 5},
  ],
  targetNumber: 1,
  activeNumbers: [],
  onAddNumber: () => {},
  onSubtractNumber: () => {},
  onCancelNumber: () => {},
  onPass: () => {},
  onSubmit: () => {},
  onPointReset: () => {}
}
const renderTableau = (props) => {
  return render(<Tableau {...props} />);
};

describe("Tableau", () => {
  afterEach(cleanup);

  describe("renders a tableau initial state", () => {
    test('Pass button is enabled', () => {
      renderTableau(testingProps);

      expect(screen.getByRole('button', { name: 'Pass' })).not.toBeDisabled()
    })

    test('Submit button is disabled', () => {
      renderTableau(testingProps);

      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
    })

    test('Feedback emoji is 🤔', () => {
      renderTableau(testingProps)

      expect(screen.getByText('🤔')).toBeInTheDocument()
    })

    test('Total points are set to 0', () => {
      renderTableau(testingProps)

      expect(screen.getByText('Total points: 0')).toBeInTheDocument()
    })

    test('Reset Points button is not rendered', () => {
      renderTableau(testingProps)

      expect(screen.queryByRole('button', { name: 'Reset points' })).not.toBeInTheDocument()
    })
  });
});
