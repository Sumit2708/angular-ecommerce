import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartStore } from '../../../../features/cart/cart.store';
import { SearchStore } from '../../../../core/utils/search.store';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public cartStore: CartStore, public search: SearchStore) {}

}
