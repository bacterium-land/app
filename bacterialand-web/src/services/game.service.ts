import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = 'https://bacterium-get-game.azurewebsites.net/api/game?code=AR0TI8kVnYzrILjYiBfStQy6oG0//zIcJk5Cd7oVdhMnt8a1nDUgWQ==';
  constructor(private http: HttpClient) { }

  getGameById(gameId: string): Observable<[]> {
    const params = `&gameId=${gameId}`;
    return this.http.get<[]>(this.url + params);
  }

  createNewGame(body: {}): Observable<{}> {
    return this.http.post<{}>(this.url, body)
    .pipe(
      tap(val => console.dir(val))
    )
  }

}
