// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeoutCallback = jest.fn();

    doStuffByTimeout(timeoutCallback, 1000);

    expect(setTimeout).toHaveBeenCalledWith(timeoutCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeoutCallback = jest.fn();

    doStuffByTimeout(timeoutCallback, 1000);
    expect(timeoutCallback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(timeoutCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const intervalCallback = jest.fn();

    doStuffByInterval(intervalCallback, 1000);

    expect(setInterval).toHaveBeenCalledWith(intervalCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const intervalCallback = jest.fn();

    doStuffByInterval(intervalCallback, 1000);

    jest.advanceTimersByTime(1000);

    expect(intervalCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(intervalCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    await readFileAsynchronously('pathToFile.txt');

    expect(path.join).toHaveBeenCalledWith(__dirname, 'pathToFile.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs.promises, 'readFile');

    const fileContent = await readFileAsynchronously('pathToFile.txt');

    expect(fs.promises.readFile).not.toHaveBeenCalled();
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('File Content');

    const fileContent = await readFileAsynchronously('pathToFile.txt');

    expect(fs.promises.readFile).toHaveBeenCalled();
    expect(fileContent).toBe('File Content');
  });
});
