import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'game/:id', component: BoardComponent },
  { path: '**', component: MainComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
