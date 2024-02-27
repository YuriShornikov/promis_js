import GameSavingLoader from '../app';
import read from '../reader';
import json from '../parser';

// Моки для reader и parser модулей
jest.mock('../reader', () => jest.fn());
jest.mock('../parser', () => jest.fn());

jest.useFakeTimers();

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

  return GameSavingLoader.load().then((result) => {
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
  }).catch((error) => {
    console.error('Error:', error);
  }).finally(() => {
    console.log('Finally block executed');
  });
});

test('Error', () => {

  // Мокируем функцию read, чтобы она выбросила ошибку
  read.mockRejectedValue(new Error('Read error'));

  // Загрузка должна завершиться ошибкой
  return GameSavingLoader.load().then((result) => {

    
    console.log('Неожиданный успех:', result);
  }).catch((error) => {

    // Проверяем, что ошибка является правильного типа и имеет правильное сообщение
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Unable to load the game saving');

    // Проверяем, что функция read была вызвана правильно
    expect(read).toHaveBeenCalledTimes(1);
    expect(json).not.toHaveBeenCalled();
  }).finally(() => {

    // Код в этом блоке будет выполнен всегда, независимо от того, была ли ошибка или нет
    console.log('Блок finally выполнен');
  });
});
