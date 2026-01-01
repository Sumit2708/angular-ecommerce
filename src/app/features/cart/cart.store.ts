import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly STORAGE_KEY = 'cart_items';

  items = signal<CartItem[]>(this.loadFromStorage());

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  message = signal<string | null>(null);

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
      console.log(this.items(), '111');
      console.log(this.totalItems(), '111');
    });
  }

  addToCart(product: Product, qty: number = 1) {
    const existingItem = this.items().find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      this.items.update((list) =>
        list.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      this.items.update((list) => [...list, { product, quantity: qty }]);
    }

    this.message.set('Item added to cart');
    setTimeout(() => this.message.set(null), 2000);
  }

  removeFromCart(productId: number) {
    this.items.update((list) => list.filter((i) => i.product.id !== productId));
  }

  clearCart() {
    this.items.set([]);
  }


  increaseQty(productId: number) {
  this.items.update(list =>
    list.map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

decreaseQty(productId: number) {
  this.items.update(list =>
    list.map(item =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
}


  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
