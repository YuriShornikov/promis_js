import json from './parser';
import read from './reader';

export default class GameSavingLoader {
    static load() {
        return read()
        .then((data) => json(data))
        .then((saving) => {
            
            // В данном случае, вместо вывода просто возвращаем объект saving
            return saving;
        })
        .catch((error) => {
            
            // Обработка ошибок во время загрузки или парсинга
            console.error('Error:', error.message);
            throw new Error('Unable to load the game saving');
        })
        .finally(() => {
            
            // Логика, которая выполняется вне зависимости от успешного/неуспешного завершения
            console.log('Game saving loading process completed');
        });
    }
}
