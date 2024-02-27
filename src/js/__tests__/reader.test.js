import read from "../reader";

jest.setTimeout(15000);

test('testing func', () => {
  return read().then((result) => {
    expect(result).toBeInstanceOf(ArrayBuffer);
  });
});