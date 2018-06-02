import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotacionPage } from './votacion';

@NgModule({
  declarations: [
    VotacionPage,
  ],
  imports: [
    IonicPageModule.forChild(VotacionPage),
  ],
})
export class VotacionPageModule {}
