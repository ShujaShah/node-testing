const lib = require('../lib');
const db = require('../db');
//Group the tests using describe()
//The number of unit tests you have for a given function should be gte or et the number of execution paths
describe('absolute', () => {
  it('should return a postive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); // toBe is a matcher function
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

//when testing strings make sure your tests are not too specific
describe('greet', () => {
  it('should return greeting message', () => {
    const result = lib.greet('Shuja');
    // expect(result).toBe('Welcome Shuja'); this is too specific
    //expect(result).toMatch(/Shuja/); //Regular Expression: this is general, here we are testing we should get string
    expect(result).toContain('Shuja');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    //Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');

    expect(result.length).toBe(3);

    //Proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    //IDEAL WAY
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 }); //Too specific

    expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // username cannot be Null, undefined, NaN, '', 0, false
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('shuja');
    expect(result).toMatchObject({
      username: 'shuja',
    });
    expect(result.id).toBeGreaterThan(0); // id is a positive number
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
