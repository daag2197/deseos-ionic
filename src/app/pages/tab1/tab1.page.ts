import { Component } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public deseosService: DeseosService,
              private router: Router,
              public alertController: AlertController) {
  }

  async agregarLista(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      }, {
        text: 'Guardar',
        handler: ( data ) => {
          if ( data.titulo.length === 0 ){
            return;
          }
          const id = this.deseosService.CrearLista( data.titulo );
          this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
        }
      }]
    });

    await alert.present();
  }


}
