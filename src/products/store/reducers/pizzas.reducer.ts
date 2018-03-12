import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";

export const pizzaAdapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: (pizza: Pizza) => pizza.id,
  sortComparer: false
});

export interface PizzasState extends EntityState<Pizza> {
  loaded: boolean;
  loading: boolean;
}

export const initialState = pizzaAdapter.getInitialState({
  loaded: false,
  loading: false
});

export function reducer(state = initialState, action: fromPizzas.pizzasAction) {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return { ...state, loading: true };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      return pizzaAdapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return { ...state, loading: false, loaded: false };
    }

    case fromPizzas.CREATE_PIZZA:
    case fromPizzas.UPDATE_PIZZA: {
      return { ...state, loading: true };
    }

    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      return pizzaAdapter.upsertOne({ id: pizza.id, changes: pizza }, state);
    }

    case fromPizzas.CREATE_PIZZA_FAIL:
    case fromPizzas.UPDATE_PIZZA_FAIL: {
      return { ...state, loading: false };
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      return pizzaAdapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}

export const getPizzasEntities = (state: PizzasState) => state.entities;
export const getPizzasLoading = (state: PizzasState) => state.loading;
export const getPizzasLoaded = (state: PizzasState) => state.loaded;
