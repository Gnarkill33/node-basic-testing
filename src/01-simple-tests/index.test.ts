// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 4, action: Action.Add })).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 35, b: 5, action: Action.Subtract })).toBe(30);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 20, action: Action.Multiply })).toBe(
      200,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 54, b: 9, action: Action.Divide })).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Exponentiate })).toBe(
      256,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: 'add' })).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 8, action: Action.Add })).toBeNull;
  });
});
