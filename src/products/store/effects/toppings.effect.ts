import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as toppingActions from "../actions/toppings.action";

import { switchMap, tap, catchError, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import * as fromService from "../../services";
import { Topping } from "../../models/topping.model";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromService.ToppingsService
  ) {}

  @Effect()
  loadTopping$ = this.actions$.ofType(toppingActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService
        .getToppings()
        .pipe(
          map(
            (toppings: Topping[]) =>
              new toppingActions.LoadToppingsSuccess(toppings)
          ),
          catchError(error => of(new toppingActions.LoadToppingsFail(error)))
        );
    })
  );
}
