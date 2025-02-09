import { instance } from '../api/axios.api.ts';

export const stopProject = async (): Promise<void> => {
  const userConfirmed = confirm('Ви впевнені, що хочете вийти?');

  if (userConfirmed) {
    try {
      const response = await instance.post('/end-proces');
      if (response.status === 200) {
        alert('Проєкт зупинено');
      } else {
        alert('Проєкт зупинено');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Сталася помилка');
    }
  }
};
