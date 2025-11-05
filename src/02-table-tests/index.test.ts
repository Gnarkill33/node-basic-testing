// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 5, action: Action.Subtract, expected: 3 },
  { a: 25, b: 10, action: Action.Subtract, expected: 15 },
  { a: 50, b: 2, action: Action.Divide, expected: 25 },
  { a: 18, b: 2, action: Action.Divide, expected: 9 },
  { a: 4, b: 6, action: Action.Multiply, expected: 24 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 3, action: 'Invalid Input', expected: null },
  { a: 5, b: 3, action: 'Invalid Input', expected: null },
  { a: '5', b: 3, action: Action.Exponentiate, expected: null },
  { a: 5, b: '3', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({a: %i, b: %i, action: %s})',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
