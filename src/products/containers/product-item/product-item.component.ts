import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

import * as fromStore from "../../store";

import { Pizza } from "../../models/pizza.model";
import { Topping } from "../../models/topping.model";

@Component({
  selector: "product-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["product-item.component.scss"],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductState>) {}
  ngOnInit() {
    this.pizza$ = this.store.pipe(
      select(fromStore.getSelectedPizza),
      tap((pizza: Pizza) => {
        // 'products/1'
        const pizzaExist = !!(pizza && pizza.toppings);
        const toppings = pizzaExist
          ? pizza.toppings.map(topping => topping.id)
          : [];
        if (pizzaExist) {
          this.store.dispatch(new fromStore.VisualiseTopping(toppings));
        }
      })
    );
    this.toppings$ = this.store.pipe(select(fromStore.getAllToppings));
    this.visualise$ = this.store.pipe(select(fromStore.getPizzaVisualized));
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseTopping(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm("Are you sure?");
    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
