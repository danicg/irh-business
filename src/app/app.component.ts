import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as category from '../actions/categories';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthProvider } from './../providers/auth.provider';
import { LoginPage } from './../pages/login/login';
import { UsersListPage } from '../pages/usersList/usersList';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private store: Store<fromRoot.State>,
    private authProvider: AuthProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'UsersList', component: UsersListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadCategories()
    });
  }

  loadCategories() {
    this.store.dispatch(new category.LoadComplete([
      { id: '1', name: 'category1'},
      { id: '2', name: 'category2'},
      { id: '3', name: 'category3'},
      { id: '4', name: 'category4'},
      { id: '5', name: 'category5'},
      { id: '6', name: 'category6'},
      { id: '7', name: 'category7'},
    ]))
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLogout() {
    this.authProvider.logout();
    this.nav.setRoot(LoginPage);
  }
}
