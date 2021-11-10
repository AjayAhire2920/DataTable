import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './commom/header/header.component';
import { FooterComponent } from './commom/footer/footer.component';
import { WordRankingComponent } from './word-ranking/word-ranking.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path : "word-ranking", component: WordRankingComponent },
  { path : "header", component: HeaderComponent },
  { path : "footer", component: FooterComponent },
  { path : "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
