import { SaveChapterComponent } from './save-chapter/save-chapter.component';
import { ChapterComponent } from './chapter/chapter.component';
import { BookComponent } from './book/book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'listMyBooks', component: ListBooksComponent},
  {path: 'showBook', component: BookComponent},
  {path: 'showChapter', component: ChapterComponent},
  {path: 'saveChapter', component: SaveChapterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
