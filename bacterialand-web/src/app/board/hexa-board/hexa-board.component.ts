import {Component, Input, OnInit} from '@angular/core';
// import {HexaCell} from "../../cell/hexa-cell/hexa-cell.component";

@Component({
  selector: 'app-hexa-board',
  templateUrl: './hexa-board.component.html',
  styleUrls: ['./hexa-board.component.css']
})
export class HexaBoardComponent implements OnInit {
  @Input() rows: number;
  @Input() cols: number;
  // hexagons: HexaCell[] = []

  constructor() {
  }

  ngOnInit(): void {
    console.dir('ngOnInit');
    console.dir(this.rows);
    // let hexaCells: HexaCell[] = [];
    let index = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // let item = new  HexaCell(i,j,0);
        // hexaCells[index++] = item;
        // this.hexagons.push(item);
      }
      // console.dir(hexaCells);
    }
  }

}
