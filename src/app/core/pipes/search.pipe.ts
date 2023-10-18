import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product: Product[], digitado: string): Product[] {
    digitado = digitado.toLowerCase();
    return product.filter(newProduct => newProduct.name.toLowerCase().includes(digitado));
  }
}
