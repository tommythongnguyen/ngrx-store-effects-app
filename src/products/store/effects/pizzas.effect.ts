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

  @Effect()
  createPizza$ = this.actions$.ofType(pizzasAction.CREATE_PIZZA).pipe(
    map((action: pizzasAction.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzasAction.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzasAction.CreatePizzaFail(error)))
        );
    })
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasAction.UPDATE_PIZZA).pipe(
    map((action: pizzasAction.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzasAction.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzasAction.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzasAction.REMOVE_PIZZA).pipe(
    map((action: pizzasAction.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(() => new pizzasAction.RemovePizzaSuccess(pizza)),
          catchError(error => of(new pizzasAction.RemovePizzaFail(error)))
        );
    })
  );
}
