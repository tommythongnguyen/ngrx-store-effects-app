import { switchMap, map, catchError } from "rxjs/operators";
import * as pizzasAction from "./../actions/pizzas.action";
import { of } from "rxjs/Observable/of";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import * as fromServices from "../../services";

import * as fromRoot from "../../../app/store";

import { Pizza } from "../../models/pizza.model";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(pizzasAction.LOAD_PIZZAS),
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
  createPizza$ = this.actions$.pipe(
    ofType(pizzasAction.CREATE_PIZZA),
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
  createPizzaSuccess$ = this.actions$.pipe(
    ofType(pizzasAction.CREATE_PIZZA_SUCCESS),
    map((action: pizzasAction.CreatePizzaSuccess) => action.payload),
    map(
      pizza =>
        new fromRoot.Go({
          path: ["/products", pizza.id]
        })
    )
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(pizzasAction.UPDATE_PIZZA),
    map((action: pizzasAction.UpdatePizza) => action.payload),
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
  removePizza$ = this.actions$.pipe(
    ofType(pizzasAction.REMOVE_PIZZA),
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

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzasAction.UPDATE_PIZZA_SUCCESS,
      pizzasAction.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map(
        pizza =>
          new fromRoot.Go({
            path: ["/products"]
          })
      )
    );
}
