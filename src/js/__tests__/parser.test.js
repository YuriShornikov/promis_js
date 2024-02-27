import json from '../parser';

jest.setTimeout(10000);

test('ArrayBuffer correctly', async () => {

  // Создаем ArrayBuffer с данными
  const buffer = new ArrayBuffer(4);
  const view = new Uint16Array(buffer);
  view[0] = 72;
  view[1] = 101;
  view[2] = 108;
  view[3] = 108;

  const result = await json(buffer);

  expect(result).toBe('Hell');
});

test('error', async () => {
  const data = 'invalidData';

  await expect(json(data)).rejects.toThrow('Invalid data type');
});