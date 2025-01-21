import { makeAutoObservable } from 'mobx';

export default class ErrorStore {
  errorData = {
    message: '',
    status: false,
    url: '',
    timestamp: new Date().toISOString(),
  };

  constructor() {
    makeAutoObservable(this);
  }

  setError(errorData) {
    this.errorData = errorData;
  }
}
