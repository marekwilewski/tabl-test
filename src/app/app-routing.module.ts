import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DateComponent } from './date/date.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'table', component: TableComponent },
  { path: 'date', component: DateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]})
export class AppRoutingModule { }
