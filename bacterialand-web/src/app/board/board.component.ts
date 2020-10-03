import { Component, OnInit, Input } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() rows: number;
  @Input() cols: number;
  tiles = [];
  gameId = '123fab';

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:4040');

  constructor() {
    this.myWebSocket.asObservable().subscribe(data => console.dir(data));
  }

  ngOnInit(): void {
    console.dir('ngOnInit');
    console.dir(this.rows);
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j<this.cols; j++) {
        row.push({
          x: i,
          y: j,
          filled: false
        });
      }
      this.tiles.push(row);
      console.dir(row);
    }
  }

  move(row: number, col: number): void {
    this.tiles[row][col].filled = true;
    this.myWebSocket.next({move: [row, col], gameId: this.gameId, player: 1});
  }

}
