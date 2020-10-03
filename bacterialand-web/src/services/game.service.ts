import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = 'https://bacterium-get-game.azurewebsites.net/api/game?code=AR0TI8kVnYzrILjYiBfStQy6oG0//zIcJk5Cd7oVdhMnt8a1nDUgWQ==';
  constructor(private http: HttpClient) { }

  getGameById(): Observable<[]> {
    const params = '&gameId=5f784e93ebafec6b9bec55f5';
    return this.http.get<[]>(this.url + params);
  }
}
