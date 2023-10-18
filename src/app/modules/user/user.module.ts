import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from '../components/product/product.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    MessageService,
    ConfirmationService
  ],
})
export class UserModule { }
