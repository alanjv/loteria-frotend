import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';






import { PredecirComponent } from './components/predecir/predecir.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PredecirComponent,
    SorteosComponent,
    LoginComponent,
    NavbarComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
