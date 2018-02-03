import { Action } from "@ngrx/store";

import { Topping } from "../../models/topping.model";

export const LOAD_TOPPINGS = "[Product] Load Toppings";
export const LOAD_TOPPINGS_SUCCESS = "[Product] Load Toppings Success";
export const LOAD_TOPPINGS_FAIL = "[Product] Load Toppings Fail";

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}
export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}
export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export type ToppingsAction =
  | LoadToppings
  | LoadToppingsSuccess
  | LoadToppingsFail;
