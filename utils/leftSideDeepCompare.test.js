const leftSideDeepCompare = require('./leftSideDeepCompare');

describe('leftSideDeepCompare', () => {
  it('should return true for identical objects', () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { a: 1, b: { c: 2 } };
    expect(leftSideDeepCompare(objA, objB)).toBe(true);
  });

  it('should return true for additional properties in objB', () => {
    const objA = { a: 1 };
    const objB = { a: 1, b: 2 };
    expect(leftSideDeepCompare(objA, objB)).toBe(true);
  });

  it('should return false if a property is missing in objB', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1 };
    expect(leftSideDeepCompare(objA, objB)).toBe(false);
  });

  it('should return false if values are not equal', () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { a: 1, b: { c: 3 } };
    expect(leftSideDeepCompare(objA, objB)).toBe(false);
  });

  it('should handle arrays correctly', () => {
    const objA = { a: [1, 2], b: { c: [3, 4] } };
    const objB = { a: [1, 2], b: { c: [3, 4] } };
    expect(leftSideDeepCompare(objA, objB)).toBe(true);
  });

  it('should return true for deeply nested objects with additional properties', () => {
    const objA = { a: { b: { c: { d: 1 } } } };
    const objB = { a: { b: { c: { d: 1, e: 2 } } } };
    expect(leftSideDeepCompare(objA, objB)).toBe(true);
  });

  it('should return false if either parameter is not an object', () => {
    const objA = { a: 1, b: { c: 2 } };
    const notAnObject = 'not an object';
    expect(leftSideDeepCompare(objA, notAnObject)).toBe(false);

    const anotherNotAnObject = 42;
    expect(leftSideDeepCompare(anotherNotAnObject, objA)).toBe(false);
  });

  it('should return true for null values in both objects', () => {
    const objA = { a: null, b: { c: null } };
    const objB = { a: null, b: { c: null } };
    expect(leftSideDeepCompare(objA, objB)).toBe(true);
  });
});
