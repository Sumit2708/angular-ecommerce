import { Component, Injectable, signal, effect, computed } from '@angular/core';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
@Injectable({ providedIn: 'root' })
export class CartComponent {
    constructor(public cart: CartStore) {}

}