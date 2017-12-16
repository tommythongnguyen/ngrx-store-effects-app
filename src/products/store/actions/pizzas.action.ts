import { Action } from "@ngrx/store";

import { Pizza } from "../../models/pizza.model";
// create action Type
export const PIZZAS_LOAD = "[Products] Pizza Load";
export const PIZZAS_LOAD_SUCCESS = "[Products] Pizza Load Success";
export const PIZZAS_LOAD_FAIL = "[Products] Pizza Load Fail";

// create Action
export class PizzasLoad implements Action {
  readonly type = PIZZAS_LOAD;
}

export class PizzasLoadSuccess implements Action {
  readonly type = PIZZAS_LOAD_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class PizzasLoadFail implements Action {
  readonly type = PIZZAS_LOAD_FAIL;
  constructor(public payload: any) {}
}
// export actions for pizza
export type PizzasAction = PizzasLoad | PizzasLoadSuccess | PizzasLoadFail;
