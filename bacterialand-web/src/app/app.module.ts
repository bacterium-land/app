import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
// import { HexaCell } from './cell/hexa-cell/hexa-cell.component';
import { HexaBoardComponent } from './board/hexa-board/hexa-board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    // HexaCell,
    HexaBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
