import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private storage: Storage) {
    this.initializeApp();
  }

  /**
   * @description Initializes the app by waiting for the platform to be ready and creating the storage instance.
   */
  async initializeApp() {
    await this.platform.ready();
    await this.storage.create();
  }
}
