import { switchMap, map, catchError } from "rxjs/operators";
import * as pizzasAction from "./../actions/pizzas.action";
import { of } from "rxjs/Observable/of";
import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import * as fromServices from "../../services";

import { Pizza } from "../../models/pizza.model";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasAction.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map((pizzas: Pizza[]) => new pizzasAction.LoadPizzaSuccess(pizzas)),
          catchError(error => of(new pizzasAction.LoadPizzaFail(error)))
        );
    })
  );
}
