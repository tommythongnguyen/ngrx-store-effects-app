import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "./toppings.selector";

// pizzas state
export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductState) => state.pizzas
);

/**
 * Adapters created with @ngrx/entity generate commonly used selector function including gettting all
 * ids in the record set
 */
export const {
  selectIds: getPizzaIds,
  selectEntities: getPizzasEntities,
  selectAll: getAllPizzas,
  selectTotal: getTotalPizzas
} = fromPizzas.pizzaAdapter.getSelectors(getPizzasState);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return { ...pizza, toppings };
  }
);

export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);
