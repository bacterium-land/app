import {Component, Input, OnInit} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, filter } from 'rxjs/operators';
import { GameService } from 'src/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() rows: number = 4;
  @Input() cols: number = 4;
  @Input() movNum: number;
  @Input() turn: number;
  tiles = [];
  nextMovNum = 2;
  gameId = '123fab';
  NO_PLAYER = 0;
  storeRow = [];

  constructor(private localStorageService: LocalStorageService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      filter(params => !!params.get('id')),
      map(params => {
        const id = params.get('id');
        console.dir(params);
        return params.get('id') || '';
      }),
      switchMap((gameId: string): Observable<any> => {
        return this.gameService.getGameById(gameId);
      })
    )
    .subscribe(gameState => {
      this.boardUpdate(gameState);
    });
  }

  //#region BOARD OPERATIONS
  // Reset of the board
  /* boardSetUp() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.storeRow.push({
          filled: this.NO_PLAYER
        });
      }
      this.tiles.push(this.storeRow);
      console.dir(this.storeRow);
    }
  } */

  // Update of the board
  boardUpdate(dbMock: { player1: string[]; player2: string[]; _id: { $oid: string }; turn: string }) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.writeCell(dbMock.player1, dbMock.player2, i, j);
      }
      // [].concat(this.storeRow)
      this.tiles.push([...this.storeRow]);
      this.storeRow = [];
    }
    console.dir(this.tiles);
  }

  //endregion

  //#region SINGLE CELL OPERATIONS

  //Writes any cell into its player owner's color (if any)
  writeCell(player1: string[], player2: string[], i: number, j: number) {
    let retorno = this.NO_PLAYER;
    function evaluateCandidate(playerParam: string[]) {
      if (playerParam != null) {
        playerParam.forEach((value, index) => {//Adding the player info
            let parts = value.split(','); // 0,1,2 === [0,1,2]
            let partsX: number = +parts[0];
            let partsY: number = +parts[1];
            let owner: number = +parts[2];
            if (partsX == i && partsY == j) {
              retorno = owner;
            }
          }
        )
      }
      return retorno;
    }

    let evaluationResult = evaluateCandidate(player1);
    if (evaluationResult == this.NO_PLAYER) {
      evaluationResult = evaluateCandidate(player2);
      if (evaluationResult == this.NO_PLAYER) {
        //It not player 1 or 2 then empty
        evaluationResult = this.NO_PLAYER;
        console.dir('none has this cell :' + i + ' ' + j);
      } else {
        console.dir('cell ' + i + ' .' + j + ' belongs to player :' + 2);
      }
    } else {
      console.dir('cell ' + i + ' .' + j + ' belongs to player :' + 1);
    }
    this.storeRow.push(evaluationResult);
  }

  //endregion

  //#region GUI OPERATIONS

  move(row: number, col: number, turn: number): void {
  this.tiles[row][col].filled = turn;
  this.tiles[row][col].movNum = this.nextMovNum++;

    function updateTurn(turn: number) {
      if (turn == 1)
      {
        turn = 2;
      }
      else {
        turn = 1;
      }
      return turn
    }

    this.turn = updateTurn(turn)

    // add movNum into data of this call
    // this.myWebSocket.next({move: [row, col], gameId: this.gameId, pPlayerName: this.tiles[row][col].filled});
  }

  //endregion
}
