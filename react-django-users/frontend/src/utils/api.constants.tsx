// API fields translation
export const apiFields = {
  first_name: 'Имя',
  middle_name: 'Отчество',
  last_name: 'Фамилия',
  email: 'Адрес электронной почты',
  phone: 'Номер телефона',
  photo: 'Фото',
  password: 'Пароль',
  new_password: 'Новый пароль',
  re_password: 'Повторить новый пароль'
};

// Response status message
type TResponseStatusMessage = {
  [key: number]: string;
}

export const responseStatusMessage: TResponseStatusMessage = {
  400: 'Некорректный запрос',
  401: 'Требуется аутентификация',
  403: 'Запрещено',
  404: 'Не найден',
  408: 'Тайм-аут запроса',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  501: 'Не реализовано',
  502: 'Плохой шлюз',
  503: 'Служба недоступна',
  504: 'Тайм-аут шлюза',
};