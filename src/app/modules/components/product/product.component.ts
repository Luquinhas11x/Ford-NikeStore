import { Component, Input, OnInit, ɵisListLikeIterable } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { MarketService } from 'src/app/core/services/market-service/market.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/core/services/cart-service/cart.service';
import { Cart } from 'src/app/core/models/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  getAllCarLegnthtSubscription = new Subscription;

  deletProductSubscription = new Subscription;

  addProductToCartSubscription = new Subscription;

  products$!: Observable<Product[]>;

  @Input() products: Product[] = [];

  @Input() status!: string;

  @Input() cart: Cart[] = [];

  totalCart: number = 0;

  visibleSidebar2!: boolean;

  displayModal!: boolean;

  cartProduct!: Product;




  total$ = of(0);



  constructor(private service: MarketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getAllCarLegnthtSubscription = this.cartService.getallCart().subscribe(product => { this.totalCart = product.length })
  }




  delet(productId: number, product: Product) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover ' + product.name + ' do mercado?',
      header: 'Remover!',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deletProductSubscription = this.service.deletProduct(productId).subscribe(response => {
          this.products = this.products.filter(product => product.id != productId)
        })
        this.messageService.add({ severity: 'error', summary: 'Deletado', detail: 'Produto deletado do mercado!' });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou' });
            break;
        }
      }
    });
  }

  showModalDialog(dialogProduct: Product) {
    this.displayModal = true;
    this.cartProduct = { ...dialogProduct }
  }

  addToCart(product: Product) {
    this.addProductToCartSubscription = this.cartService.addProduct(product).subscribe(
      response => {
        this.cart.push(response)
      }
    );
    console.log(product)
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Produto adicionado no carrinho!' });
  }


  // cleanCart() {
  //   this.cartService.getallCart().subscribe(response => {
  //     this.cart
  //   })
  // }

  ngOnDestroy(): void {
    this.addProductToCartSubscription.unsubscribe();
    this.deletProductSubscription.unsubscribe();
    this.getAllCarLegnthtSubscription.unsubscribe();
  }


}

