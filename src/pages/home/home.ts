import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceryServiceProvider } from '../../providers/grocery-service/grocery-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { isNgTemplate } from '@angular/compiler';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"

  items = [];
  errorMessage: string;

  constructor(public socialSharing: SocialSharing, public toastController: ToastController, public alertController: AlertController, public dataService: GroceryServiceProvider, public dialogService: InputDialogServiceProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    return this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error);
  }
  
  /*async removeItem(item, index) {
    console.log("Removing Item - ", index, item)
    const toast = await this.toastController.create({
      message: 'Removing ' + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index)
  }*/

  removeItem(id) {
    this.dataService.removeItem(id);
  }

  async addItem() {
    console.log("Adding Item -");
    this.dialogService.showPrompt()
  }

  async editItem(item, index) {
    console.log("Editing Item -");
    const toast = await this.toastController.create({
      message: 'Editing ' + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.dialogService.showPrompt(item, index)
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", index, item)
    const toast = await this.toastController.create({
      message: 'Sharing ' + item.name + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App"

    this.socialSharing.share(message, subject).then(()=> {
      console.log("Shared Successfully");
    }).catch((error) => {
      console.log("Error sharing", error);
    });

  }
}

