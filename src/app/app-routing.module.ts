import { ListBooksComponent } from './list-books/list-books.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'listMyBooks', component: ListBooksComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
