import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Router, Event, NavigationError, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Subject, EMPTY } from 'rxjs';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageTitle = 'Daily Mindfulness2';
  loading = true;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.authService.loggedIn;
  }


  constructor(private authService: AuthService,
              private router: Router) {

    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  userName$ = this.authService.userProfile$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );


  // displayMessages(): void {
  //   this.router.navigate([{ outlets: {popup: ['messages']}}]);
  //   this.messageService.isDisplayed = true;
  // }

  // hideMessages(): void {
  //   this.router.navigate([{ outlets: {popup: null}}]);
  //   this.messageService.isDisplayed = false;
  // }
  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logIn(): void {
    this.authService.login();
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }
}
