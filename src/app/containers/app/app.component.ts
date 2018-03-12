import { switchMap } from "rxjs/operators";
import { Component } from "@angular/core";
import { Notify } from "@ngrx/notify";
import { takeUntil, take } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";
@Component({
  selector: "app-root",
  styleUrls: ["app.component.scss"],
  template: `
  <div class="app">
    <div class="app__header">
      <img src="/assets/img/logo.svg" class="app__logo">
    </div>
    <div class="app__content">
      <div class="app__nav">
        <a routerLink="products" routerLinkActive="active">Products</a>
      </div>
      <div class="app__container">
        <router-outlet></router-outlet>
      </div>
      <div class="app__footer">
        <p>&copy; Ultimate Pizza Inc.</p>
      </div>
    </div>
  </div>
  `
})
export class AppComponent {
  constructor(private notify: Notify) {
    notify
      .requestPermission()
      .pipe(
        switchMap((permission: boolean) => {
          return notify
            .open("Hello world!")
            .pipe(takeUntil(timer(5000)), take(1));
        })
      )
      .subscribe();
  }
}
