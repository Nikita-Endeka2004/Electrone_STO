import { instance } from '../api/axios.api.ts';

export const stopProject = async (): Promise<void> => {
  try {
    const response = await instance.post('/end-proces');
    if (response.status === 200) {
      alert('Проект остановлен');
    } else {
      alert('Проект остановлен');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка');
  }
};
