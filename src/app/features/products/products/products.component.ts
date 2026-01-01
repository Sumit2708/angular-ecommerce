import { Component, effect } from '@angular/core';
import { FakestoreApiService } from '../../../core/api/fakestore-api.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { SearchStore } from '../../../core/utils/search.store';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public products: any = [];
  loading: boolean = true;

  searchText = '';
  allProducts: Product[] = [];

  categories: string[] = [];
  selectedCategory = 'all';

constructor(
  private api: FakestoreApiService,
  private search: SearchStore
) {
  effect(() => {
    this.searchText = this.search.query();
    this.applyFilters();
  });
}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();

    // this.api.getProducts().subscribe({
    //   next: (res) => {
    //     this.products = res;
    //     this.loading = false;
    //   },
    //   error: () => {
    //     this.loading = false;
    //   },
    // });
  }


  loadProducts() {
  this.loading = true;
  this.api.getProducts().subscribe(res => {
    this.allProducts = res;
    this.applyFilters();
    this.loading = false;
  });
}

onCategoryChange(category: string) {
  this.selectedCategory = category;
  this.loading = true;

  if (category === 'all') {
    this.loadProducts();
  } else {
    this.api.getProductsByCategory(category).subscribe(res => {
      this.allProducts = res;
      this.applyFilters();
      this.loading = false;
    });
  }
}


applyFilters() {
  const search = this.searchText.toLowerCase();

  this.products = this.allProducts.filter(product =>
    product.title.toLowerCase().includes(search)
  );
}



  loadCategories() {
    this.api.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  // loadProducts() {
  //   this.loading = true;
  //   this.api.getProducts().subscribe((res) => {
  //     this.products = res;
  //     this.loading = false;
  //   });
  // }

  // onCategoryChange(category: string) {
  //   this.selectedCategory = category;
  //   this.loading = true;

  //   if (category === 'all') {
  //     this.loadProducts();
  //   } else {
  //     this.api.getProductsByCategory(category).subscribe((res) => {
  //       this.products = res;
  //       this.loading = false;
  //     });
  //   }
  // }
}
