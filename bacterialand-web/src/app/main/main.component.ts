import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { GameService } from '../../services/game.service';
import { Router, ActivatedRoute } from '@angular/router';

import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.dir(this.localStorageService.getUserId());
  }

  createNewGame() {
    const createNewGame$ = this.gameService.createNewGame({player_id: this.localStorageService.getUserId()})
    .pipe(
      catchError((err:any) => {
        console.dir(err);
        return of(null);
      })
    )
    .subscribe((response: {}) => {
      console.dir(response);
      console.dir(response['game-id']);
      const gameId = response['game-id'];
      if (response) this.router.navigate(
        [`game`, gameId],
        {relativeTo: this.route}
      )
      createNewGame$.unsubscribe();
    })
  }

}
