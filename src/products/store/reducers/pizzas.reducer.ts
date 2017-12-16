import { Pizza } from "./../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}
// need to define the pizza state
export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

// need the reducer function to update the state
export function reducer(
  state = initialState,
  actions: fromPizzas.PizzasAction
) {
  switch (actions.type) {
    case fromPizzas.PIZZAS_LOAD: {
      return { ...state, loading: true };
    }

    case fromPizzas.PIZZAS_LOAD_SUCCESS: {
      const pizzas = actions.payload;

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        { ...state.entities }
      );
      return { ...state, loading: false, loaded: true, entities };
    }

    case fromPizzas.PIZZAS_LOAD_FAIL: {
      return { ...state, loading: false, load: false };
    }
  }
  return state;
}

// --- need to create seletor function to select a piece of state
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
