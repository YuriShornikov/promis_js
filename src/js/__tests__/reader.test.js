import read from "../reader";

jest.useFakeTimers;

test('test func', async () => {
  const promise = read();
  jest.runAllTimers();
  const result = await promise;
  expect(result).toBeInstanceOf(ArrayBuffer);
});