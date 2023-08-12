// Получаем все треки из бэкенда

export const getTracksAll = () =>
  fetch('https://painassasin.online/catalog/track/all/', {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw Error('Ошибка сервера')
    })
    .then((json) => json)

export default getTracksAll