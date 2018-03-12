import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as fromStore from "../store";

@Injectable()
export class VisualizeToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductState>) {}
  canActivate(): Observable<boolean> {
    this.store.dispatch(new fromStore.VisualiseTopping([]));
    return of(true);
  }
}
