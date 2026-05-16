import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importaciones de rutas y componentes que generaste
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// Las herramientas que me pasaste
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Aquí es donde inyectas el poder a tu aplicación:
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
