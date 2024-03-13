const lib = require('../fizzBuzz');

describe('fizzbuzz', () => {
  it('should throw an exception, if input is NaN', () => {
    // NaN can have many possiblities
    expect(() => {
      lib.fizzBuzz('a');
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(null);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(undefined);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz({});
    }).toThrow();
  });
  it('should return FizzBuzz if the input is divisible by 3 or 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('should return Fizz if the input is divisible by 3', () => {
    const result = lib.fizzBuzz(6);
    expect(result).toBe('Fizz');
  });
  it('should return Buzz if the input is divisible by 5', () => {
    const result = lib.fizzBuzz(10);
    expect(result).toBe('Buzz');
  });
  it('should return the input if the input is neither divisible by 3 or 5', () => {
    const result = lib.fizzBuzz(11);
    expect(result).toBe(11);
  });
});
