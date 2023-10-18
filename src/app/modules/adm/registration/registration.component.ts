import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product';
import { MarketService } from 'src/app/core/services/market-service/market.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  addProductSubscription = new Subscription;

  productForm!: FormGroup;

  productList: Product[] = [];



  constructor(private fb: FormBuilder, private service: MarketService, private messageService: MessageService) {
    this.formConfig();
  }

  ngOnInit(): void {
  }

  submitProduct() {
    this.addProductSubscription = this.service.addProduct(this.productForm.value as Product).subscribe({
      next: response => { this.productList.push(response) },
      error: error => { console.log(error) }
    });
    console.log(this.productForm.value);
    this.productForm.reset('');
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Produto adicionado no mercado!' });

    // this.route.navigate(['/user/market'])
  }

  formConfig() {
    this.productForm = this.fb.group({
      id: [new Date().getTime()],
      img: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [1],
    })
  }

  ngOnDestroy(): void {
    this.addProductSubscription.unsubscribe();
  }

}
