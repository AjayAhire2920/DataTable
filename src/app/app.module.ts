import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commom/header/header.component';
import { FooterComponent } from './commom/footer/footer.component';
import { WordRankingComponent } from './word-ranking/word-ranking.component';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WordRankingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,DataTablesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
