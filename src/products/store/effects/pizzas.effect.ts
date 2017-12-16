import { Pizza } from "./../../models/pizza.model";
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as pizzasAction from "../actions/pizzas.action";
import * as productsServices from "../../services";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class PizzasEffect {
  constructor(
    private actions$: Actions,
    private pizzasService: productsServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasAction.PIZZAS_LOAD).pipe(
    switchMap(() => {
      return this.pizzasService
        .getPizzas()
        .pipe(
          map((pizzas: Pizza[]) => new pizzasAction.PizzasLoadSuccess(pizzas)),
          catchError((error: any) => of(new pizzasAction.PizzasLoadFail(error)))
        );
    })
  );
}
