import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FakestoreApiService } from '../../../core/api/fakestore-api.service';
import { CartComponent } from '../../cart/cart/cart.component';
import { CartStore } from '../../cart/cart.store';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: any = [];
  loading: boolean = true;
  quantity = 1;

  constructor(
    public route: ActivatedRoute,
    public api: FakestoreApiService,
    public cartStore: CartStore,
    public router:Router
  ) {}

  ngOnInit() {
    this.getProductData();
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getProductData() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

     if (!id || isNaN(Number(id))) {
    this.router.navigate(['/products']);
    return;
  }

    this.api.getProduct(id).subscribe({
      next: (res:any) => {

         if (!res || !res.id) {
        this.router.navigate(['/products']);
        return;
      }
        this.product = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      },
    });
  }
}
