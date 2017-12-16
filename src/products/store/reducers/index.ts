export * from "./pizzas.reducer";
import * as fromPizzas from "./pizzas.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export const FEATURE_NAME = "Products";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

// create ReducerMap for the Products feature
export const productsReducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

// create selectorFeature and selector for those products
export const getProductsState = createFeatureSelector<ProductsState>(
  FEATURE_NAME
);

export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(getPizzaEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);
