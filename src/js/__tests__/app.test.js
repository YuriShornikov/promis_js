import GameSavingLoader from '../app';
import read from '../reader';
import json from '../parser';


jest.setTimeout(20000);

// Моки для reader и parser модулей
jest.mock('../reader', () => jest.fn());
jest.mock('../parser', () => jest.fn());

beforeEach(() => {
  // Сброс моков перед каждым тестом
  jest.clearAllMocks();
});

test('correct GameSaving object', () => {
  
  // Мокируем функцию read и json
  read.mockResolvedValue('fakeData');
  json.mockResolvedValue({
    id: 1,
    created: 1629936000,
    userInfo: {
      id: 42,
      name: 'Player',
      level: 5,
      points: 1000,
    },
  });

  return GameSavingLoader.load()
    .then((result) => {
      // Блок then, не содержащий вызовов expect
      return result;
    })
    .catch((error) => {
      // Бросаем исключение для передачи ошибки в тест
      throw error;
    })
    .then((result) => {
      // Блок с вызовами expect
      expect(result).toEqual({
        id: 1,
        created: 1629936000,
        userInfo: {
          id: 42,
          name: 'Player',
          level: 5,
          points: 1000,
        },
      });
      expect(read).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith('fakeData');
    });
});

test('testing error', () => {
  // Мокируем функцию read, чтобы она выбросила ошибку
  read.mockRejectedValue(new Error('Read error'));

  // Загрузка должна завершиться ошибкой
  return expect(GameSavingLoader.load()).rejects.toThrow('Unable to load the game saving');
});
