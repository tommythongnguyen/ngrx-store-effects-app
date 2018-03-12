import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";

import { createSelector } from "@ngrx/store";

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductState) => state.toppings
);

export const {
  selectIds: getToppingIds,
  selectEntities: getToppingEntities,
  selectAll: getAllToppings
} = fromToppings.toppingsAdapter.getSelectors(getToppingsState);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
);

export const getToppingLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingLoaded
);
export const getToppingLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingLoading
);
