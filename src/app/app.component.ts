import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime, fromEvent, Subject, distinctUntilChanged, of, Subscription } from 'rxjs';
import { Cart } from './core/models/cart';
import { Product } from './core/models/product';
import { CartService } from './core/services/cart-service/cart.service';
import { SearchService } from './core/services/search-service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nikeStore';

  getAllCartSubscription = new Subscription;

  searchValueSubscription = new Subscription;

  getAllCartLengthSubscription = new Subscription;

  getAllProductPriceSubscription = new Subscription;

  removeProductFromCartSubscription = new Subscription;

  searchSubject = new Subject<string>();

  cart: Cart[] = [];

  product: Product[] = [];

  totalCart: number = 0;

  search!: string;

  visibleSidebar2!: boolean;

  toDisplay = false;

  total!: number;

  constructor(private searchService: SearchService, private cartService: CartService, private messageService: MessageService) {
    this.getAllCartSubscription = this.cartService.getallCart().subscribe(cart => {
      this.cart = cart
    })
  }

  ngOnInit(): void {
    this.searchValueSubscription = this.searchSubject.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(value => this.searchService.setSearchValue(value))
    this.getAllCartLengthSubscription = this.cartService.getallCart().subscribe(product => { this.totalCart = product.length })
    this.totalPrice();
  }

  totalPrice() {
    let allTotal = 0
    this.getAllProductPriceSubscription = this.cartService.getallCart().subscribe(cart => {
      this.cart.forEach(product => {
        allTotal += product.price * product.quantity
        console.log(allTotal)
        this.total = allTotal
      })
    })

  }

  cleanCart() {

  }


  cartProduct() {
    this.visibleSidebar2 = true
    this.getAllCartSubscription = this.cartService.getallCart().subscribe(cart => this.cart = cart)
  }

  changeSearchValue() {
    this.searchSubject.next(this.search);
  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  clean() {
    this.search = ''
    this.searchSubject.next('')
  }

  remove(productId: number) {
    this.removeProductFromCartSubscription = this.cartService.deletProduct(productId).subscribe(response => {
      this.cart = this.cart.filter(product => product.id != productId),
        this.getAllCartLengthSubscription = this.cartService.getallCart().subscribe(product => { this.totalCart = product.length })
    })
    this.messageService.add({ severity: 'error', summary: 'Removido', detail: 'Produto removido no carrinho!' });
  }

  ngOnDestroy(): void {
    this.getAllCartLengthSubscription.unsubscribe();
    this.getAllCartSubscription.unsubscribe();
    this.getAllProductPriceSubscription.unsubscribe();
    this.removeProductFromCartSubscription.unsubscribe();
    this.searchValueSubscription.unsubscribe();
  }

}
