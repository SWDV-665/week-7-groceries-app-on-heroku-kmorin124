import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceryServiceProvider } from '../grocery-service/grocery-service'

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public http: HttpClient, public alertController: AlertController, public dataService: GroceryServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      title: item ? 'Edit Item...' : 'Add Item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Saved -', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index)
            }
            else {
              this.dataService.addItem(data)
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
