import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";

import { createSelector } from "@ngrx/store";

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductState) => state.toppings
);

export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);

export const getAllToppings = createSelector(getToppingEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getToppingLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingLoaded
);
export const getToppingLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingLoading
);
