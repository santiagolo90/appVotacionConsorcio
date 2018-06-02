import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { ModalController } from 'ionic-angular';
import { FinalPage } from '../final/final';


/**
 * Generated class for the ResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class ResultadosPage {
  votosPlanta: number = 0;
  votosMata: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    private MiAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
  }
  getEmail(){
    console.log("getEmail: "+this.MiAuth.auth.currentUser.email);
    return this.MiAuth.auth.currentUser.email;
    }

  ionViewDidLoad() {
    //this.usuarioFirebase = false;
    let spinner = this.cargando();
    spinner.present();
    this.afDB.list('/votacion', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          switch (snapshot.val().voto) {
            case "planta":
              this.votosPlanta++;

              break;
            case "mata":
              this.votosMata++
              break;

            default:
              break;
          }

          // if (snapshot.val().usuario == this.getEmail()) {
          //   return this.usuarioFirebase = true;   
          // }
        });
        spinner.dismiss();
      })

  }
  presentProfileModal() {
    if (this.getEmail() == "admin@gmail.com") {
      if (this.votosPlanta > this.votosMata) {
        let profileModal = this.modalCtrl.create(FinalPage, { ganador: 'planta',votos: this.votosPlanta });
        profileModal.present();
      }
      if (this.votosPlanta < this.votosMata) {
        let profileModal = this.modalCtrl.create(FinalPage, { ganador: 'matafuego', votos: this.votosMata });
        profileModal.present();
      }
      if (this.votosPlanta == this.votosMata) {
        return this.mostrarToast("La votación esta empatada","infoToast");
      }
    }
    else{
      return this.mostrarToast("Acceso denegado","errorToast");
    }

    

  }
  
  mostrarToast(miMsj:string,color:string) {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"ok",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  cerrarSesion() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Está seguro?',
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
            console.log('Si click');
            this.MiAuth.auth.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
  
  cargando() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    //loader.present();
    //return loader.present();
    return loader;
  }

}
