export class BaseError {
  unknownTitle: string;
  unknownText: string;

  constructor() {
    this.unknownTitle = 'Ошибка';
    this.unknownText = 'Неизвестная ошибка';
  }
}

export type TErrorMessage = {
  title: string;
  text: string;
};

export type TNumberCodeMap = {
  [key: number]: string;
};

export type TStringMap = {
  [key: string]: string;
}

export type TResponseData = {
  [key: string]: string[];
}