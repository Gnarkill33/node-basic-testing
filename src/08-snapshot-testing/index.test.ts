// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const inputElements = [1, 2, 3];
  const result = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(inputElements)).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    expect(result).toMatchSnapshot();
  });
});
