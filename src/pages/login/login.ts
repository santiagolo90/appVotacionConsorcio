import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//Agregado por mi
import { HomePage } from '../home/home';
import { VotacionPage } from'../votacion/votacion';
import { FormGroup} from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuarioSeleccionado: string;
  usuario:string;
  clave:string;

  testRadioOpen: boolean;
  testRadioResult;

  arrayUsuarios : Array <any> = [
    {id:1,nombre:"admin@gmail.com",clave:111111,perfil:"admin",sexo:"Female"},
    {id:2,nombre:"invitado@gmail.com",clave:222222,perfil:"invitado",sexo:"Female"},
    {id:3,nombre:"usuario@gmail.com",clave:333333,perfil:"usuario",sexo:"Male"},
    {id:4,nombre:"anonimo@gmail.com",clave:44,perfil:"usuario",sexo:"Male"},
    {id:5,nombre:"tester@gmail.com",clave:55,perfil:"tester",sexo:"Female"}
  ];
  
  band:number =0;

  splash = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private MiAuth:AngularFireAuth) {
                this.band =0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.splash = false;
      //this.tabBarElement.style.display = 'flex';
    }, 4000);
  }

  async iniciarSesion(){
    if(this.usuario == null || this.clave == null || this.clave == '' || this.usuario == '')
    {
      return this.mostrarToast("Debe completar los campos","errorToast");
    }
    let spinner = this.cargando();
    spinner.present();  
    await this.MiAuth.auth.signInWithEmailAndPassword(this.usuario,this.clave)
              .then(result => 
                {
                  spinner.dismiss();
                  this.navCtrl.setRoot(VotacionPage, { usuario: this.usuario })
                })
              .catch(error =>
                {
                  console.log(error.message);
                  spinner.dismiss();
                  if (error.message == "The email address is badly formatted." ) {
                    return this.mostrarToast("El correo tiene un formato incorrecto","errorToast");
                  }
                  if (error.message == "The password is invalid or the user does not have a password." ) {
                    return this.mostrarToast("Error en la clave","errorToast");
                  }
                  if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted." ) {
                    return this.mostrarToast("El usuario no existe o fue eliminado","errorToast");
                  }
                  setTimeout(() => {

                   }, 500);
                })

  }

  public doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Seleccionar Usuario');
    alert.setCssClass('succesAlert'),

    alert.addInput({
      type: 'radio',
      label: 'admin@gmail.com',
      value: 'admin',
    });

    alert.addInput({
      type: 'radio',
      label: 'invitado@gmail.com',
      value: 'invitado'
    });

    alert.addInput({
      type: 'radio',
      label: 'usuario@gmail.com',
      value: 'usuario'
    });

    alert.addInput({
      type: 'radio',
      label: 'anonimo@gmail.com',
      value: 'anonimo'
    });

    alert.addInput({
      type: 'radio',
      label: 'tester@gmail.com',
      value: 'tester'
    });

    alert.addButton('NO');
    alert.addButton({
      text: 'SI',
      handler: data => {
        console.log('Radio data:', data);

        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.usuarioSeleccionado = data;
        this.SeleccionarUsuario();
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }


  registrarUsuario(){
    return this.navCtrl.push(RegistroPage);

  }
  
  SeleccionarUsuario(){
    switch(this.usuarioSeleccionado){
      case "admin":{
        this.usuario="admin@gmail.com";
        this.clave="111111";
        break;
      }
      case "invitado":{
        this.usuario="invitado@gmail.com";
        this.clave="222222";
        break;
      }
      case "usuario":{
        this.usuario="usuario@gmail.com";
        this.clave="333333";
        break;
      }                
      case "anonimo":{
        this.usuario="anonimo@gmail.com";
        this.clave="44";
        break;
      }
      case "tester" :{
        this.usuario="tester@gmail.com";
        this.clave="55";
        break;
      }        
    }
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

}
