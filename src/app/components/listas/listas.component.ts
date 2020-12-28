import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {Lista} from '../../models/lista.model';
import {AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              public alertController: AlertController) { }

  ngOnInit() {}

  verItems(id: number){
    if ( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
    }

  }

  borrarLista(lista: Lista){
      this.deseosService.borrarLista(lista);
  }

  async modificarLista(lista: Lista){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      }, {
        text: 'Guardar',
        handler: ( data ) => {
          if ( data.titulo.length === 0 ){
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });

    await alert.present();
  }

}
