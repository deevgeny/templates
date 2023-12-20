import {
  BaseError,
  TErrorMessage,
  TResponseData
} from './baseError';
import { AxiosError } from 'axios';
import { TAlert } from '../../components/AlertsList';



export class AxiosErrorService extends BaseError {
  error: AxiosError | any;

  constructor(error: AxiosError) {
    super();
    this.error = error;
  }

  get alerts() {
    if (this.error?.response && this.error?.response?.data) {
      const data = this.error.response.data;
      switch (this.error.response.status) {
        case 401:
          return [{
            severity: 'error',
            message: apiDetail[data?.detail] || data?.detail || this.unknownText
          }] as TAlert[];
        case 400:
          return Object.entries(this.error.response.data as TResponseData)
            .reduce<TAlert[]>((acc, [key, value]) => {
              acc.push( ...value.map((v) => {
                const k = apiField[key];
                let message = apiDetail[v] || v || this.unknownText;
                if (k) {
                  message = `${message} (${k}).`;
                }
                return {
                  severity: 'error',
                  message: message
                } as TAlert;
              }));
              return acc;
            },[])
        default:
          return [{severity: 'error', message: this.unknownText}] as TAlert[];
      }
    }
    return undefined;
  }

  get message() {
    if (this.error?.response) {
      return {
        title: `Ошибка ${this.error.response.status}`,
        text: responseStatusText[this.error.response.status] || this.unknownText
      } as TErrorMessage;
    } else {
      return {
        title: axiosErrorCode[this.error.code]?.title || this.unknownTitle,
        text: axiosErrorCode[this.error.code]?.text || this.unknownText
      } as TErrorMessage;
    }
  }
}

export type TAxiosErrorCode = {
  [key: string]: TErrorMessage;
};

const axiosErrorCode: TAxiosErrorCode = {
  'ACCESS_TOKEN_REFRESH_ERROR': {
    title: 'Ошибка токена',
    text: 'Не удалось обновить токен доступа'
  },
  'ERR_NETWORK': {
    title: 'Ошибка сети',
    text: 'Не удалось загрузить ресурс'
  }
};

export type TApiDetail = {
  [key: string]: string;
};

const apiDetail: TApiDetail = {
  'user with this email address already exists.':
    'Пользователь с таким адресом электронной почты уже существует.',
  'No active account found with the given credentials':
    'Такого пользователя не существует. Проверьте правильность ввёденных данных и повторите попытку.',
};

export type TApiField = {
  [key: string]: string;
};

const apiField: TApiField = {
  'email': 'адрес электронной почты',
  'password': 'пароль',
  'first_name': 'имя',
  'last_name': 'фамилия',
  'photo': 'фото',
  'phone': 'номер телефона'
};

type TResponseStatusText = {
  [key: number]: string;
};

const responseStatusText: TResponseStatusText = {
  400: 'Некорректный запрос',
  401: 'Требуется аутентификация',
  403: 'Запрещено',
  404: 'Ресурс не найден',
  408: 'Тайм-аут запроса',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  501: 'Не реализовано',
  502: 'Плохой шлюз',
  503: 'Служба недоступна',
  504: 'Тайм-аут шлюза',
};