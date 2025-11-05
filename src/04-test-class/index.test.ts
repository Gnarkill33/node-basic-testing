// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const newBankAccount = getBankAccount(2000);

    expect(newBankAccount.getBalance()).toBe(2000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newBankAccount = getBankAccount(2000);
    const newBankAccountBalance = newBankAccount.getBalance();

    expect(() => newBankAccount.withdraw(3000)).toThrow(
      new InsufficientFundsError(newBankAccountBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccount = getBankAccount(2000);
    const newBankAccountBalance = newBankAccount.getBalance();
    const anotherBankAccount = getBankAccount(3000);

    expect(() => newBankAccount.transfer(2500, anotherBankAccount)).toThrow(
      new InsufficientFundsError(newBankAccountBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const newBankAccount = getBankAccount(2000);

    expect(() => newBankAccount.transfer(1000, newBankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const newBankAccount = getBankAccount(2000);
    const newBankAccountBalance = newBankAccount.deposit(500);

    expect(newBankAccountBalance.getBalance()).toBe(2500);
  });

  test('should withdraw money', () => {
    const newBankAccount = getBankAccount(2000);
    const newBankAccountBalance = newBankAccount.withdraw(500);

    expect(newBankAccountBalance.getBalance()).toBe(1500);
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(2000);
    const anotherBankAccount = getBankAccount(3000);

    newBankAccount.transfer(500, anotherBankAccount);

    expect(newBankAccount.getBalance()).toBe(1500);
    expect(anotherBankAccount.getBalance()).toBe(3500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);

    const account = getBankAccount(2000);
    const balance = await account.fetchBalance();

    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);

    const account = getBankAccount(2000);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0);

    const account = getBankAccount(2000);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
