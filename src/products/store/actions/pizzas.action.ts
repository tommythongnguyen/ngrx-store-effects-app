import { Action } from "@ngrx/store";
import { Pizza } from "../../models/pizza.model";

export const LOAD_PIZZAS = "[Products] Load Pizzas";
export const LOAD_PIZZAS_SUCCESS = "[Products] Load Pizzas Success";
export const LOAD_PIZZAS_FAIL = "[Products] Load Pizzas Fail";

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzaSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class LoadPizzaFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export type pizzasAction = LoadPizzas | LoadPizzaSuccess | LoadPizzaFail;
