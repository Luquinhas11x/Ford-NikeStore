import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart-service/cart.service';
import { MarketService } from 'src/app/core/services/market-service/market.service';
import { SearchService } from 'src/app/core/services/search-service/search.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  searchProductsSubscription = new Subscription;

  getAllCartSubscription = new Subscription;

  getAllProductsSubscription = new Subscription;

  filterShoesSubscription = new Subscription;

  filterClothesSubscription = new Subscription;

  filterAcessoriesSubscription = new Subscription;

  products: Product[] = [];

  cart: Cart[] = [];

  toDisplay = false;

  constructor(private service: MarketService, private searchService: SearchService, private cartService: CartService) {
    this.getProducts();
  }

  ngOnInit(): void {
    this.searchProductsSubscription = this.searchService.serachValue$.subscribe(value => {
      this.service.getProductsByNameLike(value).subscribe(product => this.products = product)
    })

  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  getProducts() {
    this.getAllProductsSubscription = this.service.getall().subscribe(product => this.products = product)
    this.getAllCartSubscription = this.cartService.getallCart().subscribe(cart => this.cart = cart)
  }

  filterShoes() {
    this.getAllCartSubscription = this.service.getall().subscribe(product => this.products = product)
    this.filterShoesSubscription = this.service.getall().subscribe(response => {
      this.products = this.products.filter(product => product.category == 'shoes')
    })
  }

  filterAcessories() {
    this.getAllCartSubscription = this.service.getall().subscribe(product => this.products = product)
    this.filterAcessoriesSubscription = this.service.getall().subscribe(response => {
      this.products = this.products.filter(product => product.category == 'acessories')
    })
  }

  filterClothes() {
    this.getAllCartSubscription = this.service.getall().subscribe(product => this.products = product)
    this.filterClothesSubscription = this.service.getall().subscribe(response => {
      this.products = this.products.filter(product => product.category == 'clothes')
    })
  }

  showAll() {
    this.getAllProductsSubscription = this.service.getall().subscribe(product => this.products = product)
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
    this.getAllCartSubscription.unsubscribe();
    this.filterAcessoriesSubscription.unsubscribe();
    this.filterClothesSubscription.unsubscribe();
    this.filterShoesSubscription.unsubscribe();
    this.searchProductsSubscription.unsubscribe();
  }
}
