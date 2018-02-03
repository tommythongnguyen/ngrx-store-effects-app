import { PizzasGuard } from "./pizzas.guard";
import { PizzaExistsGuards } from "./pizza-exists.guard";
import { ToppingsGuard } from "./toppings.guard";

export const guards: any[] = [PizzasGuard, PizzaExistsGuards, ToppingsGuard];

export * from "./pizzas.guard";
export * from "./pizza-exists.guard";
export * from "./toppings.guard";
