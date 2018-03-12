import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import * as fromToppings from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

export const toppingsAdapter: EntityAdapter<Topping> = createEntityAdapter<
  Topping
>({
  selectId: (topping: Topping) => topping.id,
  sortComparer: false
});

export interface ToppingsState extends EntityState<Topping> {
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}
export const initialState = toppingsAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedToppings: []
});

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
) {
  switch (action.type) {
    case fromToppings.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
    case fromToppings.LOAD_TOPPINGS: {
      return { ...state, loading: true };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      return toppingsAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return { ...state, loaded: false, loading: false };
    }
    default:
      return state;
  }
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingLoaded = (state: ToppingsState) => state.loaded;
export const getToppingLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
