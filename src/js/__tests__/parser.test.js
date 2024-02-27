import json from '../parser';

jest.setTimeout(15000);

test('testing json function', () => {
  const data = new ArrayBuffer(4);
  const view = new Uint16Array(data);
  view[0] = 72;
  view[1] = 101;

  return json(data).then((result) => {
    expect(result).toBe('He');
  });
});