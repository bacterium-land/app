import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }

  getUserId(): string {
    const userId = this.localStorage.getItem('user-id');
    return userId ? userId : this.setUserid(Guid.create().toString())
  }

  setUserid(value: string): string {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem('user-id', value);
      return value;
    }
    return null;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

}
