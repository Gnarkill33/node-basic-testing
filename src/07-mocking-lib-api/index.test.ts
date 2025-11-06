// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosInstance = axios.create();
    jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: 'some data' });
    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);

    await throttledGetDataFromApi('/posts');

    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const axiosInstance = axios.create();
    jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: 'some data' });
    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = { id: 1, name: 'Test Data' };
    const relativePath = '/posts';
    const axiosInstance = axios.create();
    jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: responseData });
    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);

    const response = await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(response).toBe(responseData);
  });
});
