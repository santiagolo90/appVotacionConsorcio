import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage} from '../pages/login/login';//agregue esto
import { VotacionPage } from'../pages/votacion/votacion';//agregue esto
import { RegistroPage } from'../pages/registro/registro';//agregue esto
import { ResultadosPage } from'../pages/resultados/resultados';//agregue esto
import { FinalPage } from '../pages/final/final';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
//ng-select
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

export const firebaseConfig = {
  //Datos FireBase
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    VotacionPage,
    HomePage,
    RegistroPage,
    ResultadosPage,
    ListPage,
    FinalPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgSelectModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    VotacionPage,
    HomePage,
    RegistroPage,
    ResultadosPage,
    ListPage,
    FinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
