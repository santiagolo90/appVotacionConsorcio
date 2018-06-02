import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ResultadosPage } from '../resultados/resultados'



/**
 * Generated class for the VotacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votacion',
  templateUrl: 'votacion.html',
})
export class VotacionPage {

  votosPlanta:number =0;
  votosMata:number =0;
  porcentajeMata:number =0;
  porcentajePlanta:number =0;
  usuarioFirebase: boolean = false;
  msjVoto:string ="Toque para votar";
  sumaVotos:number =0;
  eleccionUsuario:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    private MiAuth:AngularFireAuth,
    private alertCtrl: AlertController) {
  }

  getUserID(){
    console.log("getUserID: "+this.MiAuth.auth.currentUser.uid);
    return this.MiAuth.auth.currentUser.uid;
  }
  getEmail(){
  console.log("getEmail: "+this.MiAuth.auth.currentUser.email);
  return this.MiAuth.auth.currentUser.email;
  }

   guardaVoto(voto:string){
     //let hora = Date.now();
     let sitio  = {
       "id":this.getUserID(),
       "usuario":this.getEmail(),
       "voto":voto}
     return this.afDB.database.ref('votacion/'+this.getUserID()).set(sitio);
   }

  votoPlanta(){
    if(this.usuarioFirebase == false){
      this.sumaVotos++;
      console.log("sumaVotos: ",this.sumaVotos);
      //this.votosPlanta++;
      console.log("votosPlanta: ",this.votosPlanta);
      this.mostrarToast("Gracias por votar por plantas","successToast");
      this.msjVoto = "Usted ya votó";
      this.usuarioFirebase = true;
      return this.guardaVoto("planta");
    }else{
      return this.mostrarToast("Usted ya votó","warningToast");
    }

    
  }

  votoMatafuego(){
    if(this.usuarioFirebase == false){
      this.sumaVotos++;
      console.log("sumaVotos: ",this.sumaVotos);
      //this.votosMata++;
      console.log("votosMata: ",this.votosMata);
      this.mostrarToast("Gracias por votar por matafuegos","successToast");
      this.msjVoto = "Usted ya votó";
      this.usuarioFirebase = true;
      return this.guardaVoto("mata");
    }else{
      return this.mostrarToast("Usted ya votó","warningToast");
    }
  }

  verVotos(){
    if (this.usuarioFirebase == false) {
      this.mostrarToast("Para ver los resultados debe votar","infoToast");
    }else{
      this.navCtrl.push(ResultadosPage)
    }

  }

  

  ionViewDidLoad() {
    this.usuarioFirebase = false;
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/votacion', { preserveSnapshot: true})
                .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                  switch (snapshot.val().voto) {
                    case "planta":
                    this.votosPlanta ++;
                      
                      break;
                    case "mata":
                    this.votosMata ++
                      break;  
                  
                    default:
                      break;
                  }

                  if (snapshot.val().usuario == this.getEmail()) {
                    this.msjVoto = "Usted ya votó";
                    return this.usuarioFirebase = true;   
                  }
              });
              spinner.dismiss();
            })
            
  }

  mostrarToast(miMsj:string,color:string) {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"cerrar",
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
      cssClass: 'errorAlert',
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
