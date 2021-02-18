import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Equation from "./Equation";

const testingProps = {
  rightSide: 9,
};

const renderEquation = (props) => {
  return render(<Equation {...props} />);
};

describe("Equation", () => {
  afterEach(cleanup);

  test("renders an initial state of ??? equaling the value", () => {
    renderEquation(testingProps);

    expect(screen.getByText("??? = 9")).toBeInTheDocument()
  });

  test('renders a not equals sign when the left side does not equal the right side', () => {
    renderEquation({
      ...testingProps,
      leftSide: [
        { id: '123iu4h', value: 8, operation: 'add' },
        { id: '142iy7a', value: 4, operation: 'subtract' }
      ],
      isValid: false
    })

    expect(screen.getByText('8 - 4 ≠ 9'))
  })

  test('renders an equals sign when the left side does equal the right side', () => {
    renderEquation({
      ...testingProps,
      leftSide: [
        { id: '123iu4h', value: 5, operation: 'add' },
        { id: '142iy7a', value: 4, operation: 'add' }
      ],
      isValid: true
    })

    expect(screen.getByText('5 + 4 = 9'))
  })

  test('renders the left most number on the left side as a negative number if its operation is subtract', () => {
    renderEquation({
      ...testingProps,
      leftSide: [
        { id: '123iu4h', value: 5, operation: 'subtract' },
        { id: '142iy7a', value: 4, operation: 'add' }
      ],
      isValid: false
    })

    expect(screen.getByText('-5 + 4 ≠ 9'))
  })

  test('renders the correct + or - operator based on the number operator', () => {
    renderEquation({
      ...testingProps,
      leftSide: [
        { id: '123iu4h', value: 6, operation: 'add' },
        { id: '142iy7a', value: 5, operation: 'add' },
        { id: '532he8h', value: 2, operation: 'subtract' }
      ],
      isValid: true
    })

    expect(screen.getByText('6 + 5 - 2 = 9'))
  })
});
