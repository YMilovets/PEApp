import * as idb from 'idb';
import { ExerciseItemRequest } from '../Types';

export const PEAppDB = await idb.openDB('PEApp', 2, {
  upgrade(upgradeDB) {
    // Проверка на несуществующее имя хранилища в базе данных
    if (!upgradeDB.objectStoreNames.contains('exercisesList')) {
      const exerciseEntity = upgradeDB.createObjectStore('exercisesList', {
        keyPath: 'id',
        autoIncrement: true,
      });
      // Создаем уникальный ключ для поля link
      exerciseEntity.createIndex('link', 'link', { unique: true });
    }
  },
});

export async function removeAllExercises() {
  // Открывает транзакцию для сущности exercises в режиме чтение-запись
  const transaction = PEAppDB.transaction(['exercisesList'], 'readwrite');
  // Открытие доступа к хранилищу exercises
  const exerciseStore = transaction.objectStore('exercisesList');
  // Очистить все элементы в хранилище
  exerciseStore.clear();
  // Возвращаем сообщение об успешном выполнении транзакции
  return transaction.oncomplete;
}

export async function setExercise(exerciseRecord: ExerciseItemRequest) {
  // Открывает транзакцию для сущности exercises в режиме чтение-запись
  const transaction = PEAppDB.transaction(['exercisesList'], 'readwrite');
  // Открытие доступа к хранилищу exercises
  const exerciseStore = transaction.objectStore('exercisesList');
  // Изменяем запись в хранилище, если она есть, или добавляем, если - нет
  exerciseStore.put(exerciseRecord);
  // Возвращаем сообщение об успешном выполнении транзакции
  return transaction.oncomplete;
}

export async function getAllExercises() {
  // Открывает транзакцию для сущности exercises в режиме чтение
  const transaction = PEAppDB.transaction(['exercisesList'], 'readonly');
  // Открытие доступа к хранилищу exercises
  const exerciseStore = transaction.objectStore('exercisesList');
  // Получаем все данные из хранилища
  return exerciseStore.getAll();
}
