import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the FinalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {

  ganador :boolean;
  votosPlanta: number = 100;
  votosMata: number = 99;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public afDB: AngularFireDatabase,
    private MiAuth: AngularFireAuth) {
      
    console.log('ganador', navParams.get('ganador'));
    if (navParams.get('ganador') == 'planta') {
      this.votosPlanta = navParams.get('votos')
      this.ganador = false;
    }else{
      this.ganador = true;
      this.votosMata = navParams.get('votos')
    }
  }

  public cerrarSesion() {
    let alert = this.alertCtrl.create({
      title: '¿Eliminar votos?',
      //message: '¿Está seguro?',
      cssClass: 'warningAlert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel click');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.afDB.database.ref('votacion/').set("");
            console.log('Si click');
            this.MiAuth.auth.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalPage');
  }

  

}
