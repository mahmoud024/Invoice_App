import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SideNavbarComponent} from './side-navbar/side-navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from './invoces/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ProfileComponent} from './profile/profile.component';
import {InvocesComponent} from './invoces/invoces.component';
import {CardsComponent} from './invoces/cards/cards.component';


import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AddInvoiceComponent} from './invoces/header/add-invoice/add-invoice.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UpdateDeleteComponent} from './invoces/cards/update-delete/update-delete.component';
import {SliderUpdateComponent} from './invoces/cards/update-delete/slider-update/slider-update.component';
import {AuthService} from "./services/auth.service";
import {GuardService} from "./services/guard.service";
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClientModule} from '@angular/common/http';
import {NavigationComponent} from './navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {UpdatedComponent} from './invoces/cards/update-delete/updated/updated.component';




@NgModule({
    bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SideNavbarComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    InvocesComponent,
    CardsComponent,
    AddInvoiceComponent,
    UpdateDeleteComponent,
      SliderUpdateComponent,
      NavigationComponent,
      UpdatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAQL9C2LoMGF9A4NxRE-pyE1zp_9w3LPNE",
      authDomain: "finaltask-c2f81.firebaseapp.com",
      projectId: "finaltask-c2f81",
      storageBucket: "finaltask-c2f81.appspot.com",
      messagingSenderId: "391587213857",
      appId: "1:391587213857:web:2a7faa4c07a8208bf3a960",
      measurementId: "G-8MC3V72XMS"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule,
    ReactiveFormsModule,
      BrowserAnimationsModule,
      AngularSvgIconModule,
      HttpClientModule,
      TranslateModule.forRoot({
          defaultLanguage: 'ar',
          loader: {
              provide: TranslateLoader,
              useFactory: createTranslationLoader,
              deps: [HttpClient]
          }
      }),
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule

  ],
    providers: [AuthService, GuardService]
})
export class AppModule { }

export function createTranslationLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
