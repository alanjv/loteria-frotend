import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from "@angular/common";






import { PredecirComponent } from './components/predecir/predecir.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    PredecirComponent,
    SorteosComponent,
    NavbarComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'dev-6y0sn8t0.us.auth0.com',
      clientId: 'b595Xa1yGQUpxzpzEk3ihH3xZaOYi2MF'
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
