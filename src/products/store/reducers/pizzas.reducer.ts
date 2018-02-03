import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";
export interface PizzasState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzasState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromPizzas.pizzasAction) {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS:
      return { ...state, loading: true };

    case fromPizzas.LOAD_PIZZAS_SUCCESS:
      const pizzas = action.payload;

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };

    case fromPizzas.LOAD_PIZZAS_FAIL:
      return { ...state, loading: false, loaded: false };

    default:
      return state;
  }
}

export const getPizzasEntities = (state: PizzasState) => state.entities;
export const getPizzasLoading = (state: PizzasState) => state.loading;
export const getPizzasLoaded = (state: PizzasState) => state.loaded;
